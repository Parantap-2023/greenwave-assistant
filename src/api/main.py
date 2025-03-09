
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sys
import os
import time

# Add the parent directory to the path so we can import EcoChat
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import functionality from EcoChat.py
import streamlit as st
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = None

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = None

# Initialize embeddings and vector store (from EcoChat.py)
groq_api_key = "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"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Try to load vector store, handle errors gracefully
try:
    vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    retriever = vector_store.as_retriever()
except Exception as e:
    print(f"Error loading vector store: {e}")
    vector_store = None
    retriever = None

# Initialize LLM
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")

# Define prompt template (from EcoChat.py)
prompt = ChatPromptTemplate.from_template(
    """
    You are a sustainability expert. Answer questions with a deep understanding of sustainability principles, 
    industry practices, and environmental impact. Use the provided context when available; otherwise, rely on your expertise.

    If the user asks for specific emissions data (e.g., "What are the emissions of making HDPE CAP?"), 
    check if the data is present in the provided documents. If the data is found, use only that value. 
    Also, some materials have multiple names (e.g., HDPE and Bio-HDPE). If the user is not specific, provide data for both.

    When providing emissions data, include real-world equivalents like this:
    **Example:**
    - 1.929 kg CO2 equivalent is equal to:
      - Driving a car for ~40 miles (64 km)
      - A 100-watt light bulb running for ~4.5 days
      - Carbon sequestration of ~12 sq. meters of forest per year

    If the data is not found, respond with:
    "This specific information is not available in the provided data, but according to my knowledge, [provide an estimate]."

    <context>
    {context}
    </context>

    Conversation History:
    {history}

    Question: {input}

    Provide clear, accurate, and well-explained responses, making sure to emphasize sustainability aspects where relevant.
    """
)

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Extract history for context
        history_text = "\n".join([msg.content for msg in request.history]) if request.history else ""
        
        # Check if vector store is initialized
        if vector_store is None:
            return ChatResponse(
                response="I'm sorry, but I couldn't access my sustainability knowledge base. "
                         "I'll try to answer based on my general knowledge.\n\n"
                         "For specific emissions data or sustainability metrics, please try again later.",
                sources=[]
            )
        
        # Create document chain and retrieval chain (from EcoChat.py)
        document_chain = create_stuff_documents_chain(llm, prompt)
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        
        # Get response
        start = time.process_time()
        response = retrieval_chain.invoke({'input': request.message, 'history': history_text})
        elapsed_time = time.process_time() - start
        print(f"Response time: {elapsed_time:.2f} seconds")
        
        # Extract retrieved documents
        retrieved_docs = response.get("context", [])
        source_texts = [doc.metadata.get("source", "Unknown source") for doc in retrieved_docs] if retrieved_docs else []
        
        # Format the response
        if any(keyword in request.message.lower() for keyword in ["emissions", "carbon footprint", "ghg", "co2"]):
            if retrieved_docs:
                bot_response = response.get('answer', "No response generated.")
            else:
                bot_response = "⚠️ **This specific information is not available in the provided data.**\n\n🌍 **But according to my sustainability knowledge:**\n\n" + response.get('answer', "No response generated.")
        else:
            bot_response = response.get('answer', "No response generated.")
            
        return ChatResponse(
            response=bot_response,
            sources=source_texts
        )
    except Exception as e:
        print(f"Error generating response: {e}")
        return ChatResponse(
            response="I apologize, but I encountered an error while processing your request. Please try again later.",
            sources=[]
        )

@app.get("/")
async def read_root():
    return {"status": "EcoChat API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
