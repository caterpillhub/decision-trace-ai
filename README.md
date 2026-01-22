# 🧠 Decision-Trace-AI  
**A Full-Stack Generative AI Decision Analysis Agent (Pydantic AI)**

Decision-Trace-AI is a live, full-stack generative AI application that helps users make complex decisions through structured reasoning, clarification, and stress testing.  
The system behaves like a thoughtful analyst — asking clarifying questions before producing a final, well-reasoned recommendation.

---

## 🚀 Live Demo
🔗 **Live App:** https://decision-trace-ai.vercel.app  
🔗 **Backend API:** https://decision-trace-ai.onrender.com/docs  

---

## 🎯 Problem Statement
People often make important life decisions (career, startups, education, relocation) with incomplete reasoning and emotional bias.  
Most AI tools jump directly to advice without understanding constraints or context.

**Decision-Trace-AI solves this by:**
- Asking clarifying questions
- Structuring risks, alternatives, and assumptions
- Stress-testing decisions before recommending an outcome

---

## 🧩 Key Features

### 🧠 Intelligent Decision Agent
- Built using **Pydantic AI**
- Multi-turn reasoning
- Stops asking questions only when sufficient information is collected

### 🔄 Follow-Up Question Loop
- Dynamic clarification questions
- Session-scoped agent instances (no state leakage)
- Robust handling of incomplete information

### 📊 Structured Analysis Output
- Key risks
- Possible alternatives
- Final recommendation
- Confidence level

### 🧪 Stress Testing
- Evaluates how decisions perform under adverse scenarios
- Helps users anticipate failure points

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (App Router)**
- TypeScript
- TailwindCSS + custom UI components
- Deployed on **Vercel**

### Backend
- **FastAPI**
- **Pydantic AI**
- OpenRouter free LLM (`openai/gpt-3.5-turbo`)
- Session-based agent orchestration
- Deployed on **Render**

---

## 🔐 Agent Architecture (Important)
- A **new agent instance is created per decision session**
- Each session is tracked using a `session_id`
- Agent state is cleaned up after analysis
- Prevents infinite loops and cross-user interference

This mirrors real-world production AI agent design.

---

## 🔁 User Flow

1. User defines a decision
2. AI asks clarifying questions
3. User answers follow-ups
4. AI generates final analysis
5. Decision is stress-tested
6. User can restart or try a new decision

---

## 🧪 Example Use Cases
- Career change decisions
- Startup vs job evaluation
- Higher studies planning
- Risk analysis for personal choices

---

## 🛠️ Local Setup (Optional)

```bash
# Backend
cd backend
uvicorn app.main:app

# Frontend
cd frontend
npm run dev


