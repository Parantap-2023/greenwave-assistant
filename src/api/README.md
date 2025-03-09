
# EcoChat Backend Setup and Integration

This document provides instructions for setting up and integrating the EcoChat Python backend with the frontend application.

## Quick Start

1. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

2. Make sure the FAISS index is created:
   ```bash
   python create_embeddings.py
   ```

3. Run the FastAPI server:
   ```bash
   cd src/api
   python main.py
   ```

4. The API will be available at `http://localhost:8000/chat`

## Integration Details

The EcoChat backend works by:
1. Loading the vector store created by `create_embeddings.py`
2. Using Groq's LLM to generate responses based on user queries
3. Retrieving relevant information from the vector store to enhance responses
4. Returning formatted answers to the frontend

## Configuration

- Update the `groq_api_key` in `main.py` if needed
- Adjust the CORS settings in `main.py` for production
- Change the `API_URL` in `src/components/EcoChat.tsx` to match your deployed backend URL

## Troubleshooting

- If you encounter CORS issues, make sure your frontend origin is included in the allowed origins list
- If the vector store fails to load, ensure the `faiss_index` directory exists and was created correctly
- Check the console logs for any error messages from the Python backend

## Frontend Integration

The frontend is configured to:
1. Fall back to a simplified mode if the backend is unavailable
2. Format markdown elements in the responses
3. Display a status indicator when in fallback mode

Remember to update the `USE_FALLBACK` flag in `EcoChat.tsx` when deploying to production.
