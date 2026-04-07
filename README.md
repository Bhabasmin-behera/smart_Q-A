# smart_Q-A
Assignment for smart Q/A system
#  Smart Q&A API (RAG + LLM)

##  Setup (Run in under 5 minutes)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd smart-qa-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb+srv://bhabasmin9348_db_user:B68GFuMOmoSpdD4k@cluster0.3kqlyqk.mongodb.net/?appName=Cluster0
JWT_SECRET=smartQA1234
GROQ_API_KEY=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
```

---

## Seed Script (Insert Sample Data)

Run the seed script to populate documents:

```bash
npm run seed
```

---

## Start Server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

#  API Endpoints (cURL Examples)

---

##  1. Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"bhabasmin@gmail.com","password":"123456"}'
```

---

##  2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@gmail.com","password":"123456"}'
```

 Copy the returned **token**

---

##  3. Get Documents

```bash
curl http://localhost:5000/api/docs
```

---

##  4. Ask Question (Protected)

```bash
curl -X POST http://localhost:5000/api/ask \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"question":"What is refund policy?"}'
```

###  Response Format

```json
{
  "answer": "Refunds are processed within 5-7 business days.",
  "sources": ["doc_id_1"],
  "confidence": "high"
}
```

---

##  5. Get Ask History (Bonus)

```bash
curl http://localhost:5000/api/ask/history \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

##  Notes

* Ensure MongoDB is running locally
* Replace `YOUR_TOKEN` with JWT from login
* Use valid Groq API key for LLM responses

---
