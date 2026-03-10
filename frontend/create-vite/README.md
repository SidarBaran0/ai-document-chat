# AI Document Chat

A full-stack web application that allows users to upload PDF documents and ask questions about the content using AI.

The system extracts text from the uploaded document and uses an AI model to answer questions based on the document content.

---

## Features

* Upload PDF documents
* Extract text from PDF files
* Ask questions about the document
* AI generates answers based on the document content
* Simple chat-style interface

---

## Tech Stack

Frontend

* React (Vite)

Backend

* .NET Web API

AI

* OpenAI API (GPT model)

Libraries

* PdfPig for PDF text extraction

---

## Architecture

User uploads PDF
↓
Backend extracts text from the document
↓
Document is stored in memory
↓
User asks a question
↓
Backend sends document text + question to AI
↓
AI generates answer
↓
Answer is returned to the frontend chat

---

## Project Structure

ai-document-platform
├── backend
│   └── DocumentAPI (.NET Web API)
│
├── frontend
│   └── React application (Vite)

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/ai-document-chat.git
cd ai-document-chat
```

---

### 2. Set OpenAI API key

The backend requires an OpenAI API key.

Mac / Linux

```
export OPENAI_API_KEY=your_api_key_here
```

Windows

```
setx OPENAI_API_KEY "your_api_key_here"
```

---

### 3. Run the backend

```
cd backend/DocumentAPI
dotnet run
```

The API will run on:

```
http://localhost:5258
```

Swagger will be available at:

```
http://localhost:5258/swagger
```

---

### 4. Run the frontend

Open a new terminal:

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Example Usage

1. Upload a PDF document
2. Ask a question about the document
3. The AI will generate an answer based on the document content

Example:

Question

```
What is this document about?
```

AI Response

```
The document describes ...
```

---

## Future Improvements

* Semantic search with embeddings (RAG)
* Store documents in a database
* Support multiple documents
* Improve UI/UX
* Add authentication

---

## Author

Sidar Baran
Bachelor's degree in Information Technology
Specialization: Machine Learning and Artificial Intelligence
