FROM python:3.10-slim

WORKDIR /app

# Install build-essential for any potential C compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

# Copy all backend files (including the artifacts directory with model files)
COPY . .

# Hugging Face Spaces runs on port 7860 by default
EXPOSE 7860

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
