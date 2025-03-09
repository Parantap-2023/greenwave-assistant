
# EcoChat Backend Integration

This document provides instructions for setting up and integrating the EcoChat Python backend with the frontend application.

## Setup Instructions

1. Install the required Python packages:
   ```bash
   pip install fastapi uvicorn pydantic python-dotenv
   ```

2. Create a FastAPI wrapper for your EcoChat.py script:

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Import your EcoChat implementation
# from ecochat import EcoChatBot  # Uncomment and update with your actual import

app = FastAPI()

# Configure CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-production-domain.com"],
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

# Initialize your chatbot instance
# chatbot = EcoChatBot()  # Uncomment and update with your actual initialization

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Process the message using your EcoChat implementation
        # response = chatbot.process_message(request.message, request.history)
        # return ChatResponse(response=response.text, sources=response.sources)
        
        # For now, return a placeholder response
        return ChatResponse(
            response=f"This is a placeholder response for: {request.message}",
            sources=["Placeholder source"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

3. Run the backend server:
   ```bash
   python main.py
   ```

4. The API will be available at `http://localhost:8000/chat`

## Integration Notes

1. Update the `API_URL` in `src/components/EcoChat.tsx` to point to your deployed backend URL.

2. The frontend expects responses in this format:
   ```json
   {
     "response": "The chatbot's response text goes here",
     "sources": ["Optional list of sources or references"]
   }
   ```

3. You may need to modify the request format to match what your EcoChat.py implementation expects.

## Deployment

1. For production deployment, you can use:
   - Python backend: Render, Heroku, DigitalOcean, or AWS
   - Remember to update CORS settings to allow requests from your production frontend domain

2. Set up environment variables for any API keys or sensitive configuration.
