
---

# 🤖 Build an AI Agent with Google Gemini (Free Tier)

This project creates an AI agent from scratch using Node.js and **Google's Gemini API**, based on the open-source tutorial from [Hendrixer/agent-from-scratch](https://github.com/Hendrixer/agent-from-scratch). It replaces OpenAI with **Google Gemini**, making it completely free to experiment with.

> ✅ Perfect for developers looking to explore AI agents without incurring any costs.

---

## 🌟 Features

- Uses **Google Gemini API** (`@google/genai`)
- No OpenAI key needed – works entirely on Gemini’s free tier
- Built in **TypeScript** for type safety and modular design
- Based on a proven educational template
- Fully extensible: add tools, memory, workflows, and more

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js v18+**
- A free **Google Gemini API key** from AI Studio

👉 Get your Gemini API key here: [Google AI Studio API Key](https://aistudio.google.com/u/1/apikey)

---

### 📦 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/gsk-007/ai-agent-gemini.git
cd ai-agent-gemini
```

2. **Install dependencies**

```bash
npm install
# or
bun install
```

3. **Add your environment variables**

Create a `.env` file in the root directory with the following content:

```env
GEMINI_API_KEY=your_google_api_key_here
```

> 🔐 Keep your API key secret! Never commit it to version control.

4. **Chat With Model**

```bash
npm run dev "<your message>"
# or
bun run index.ts "<your message>"
```

---

## 🗂️ Project Structure

```
├── src/
│   ├── agent.ts          # Core agent logic using Gemini
│   ├── tools.ts          # Extendable tool interface
│   ├── memory.ts         # Optional memory implementation
│   └── types.ts          # Shared types and interfaces
├── index.ts              # Entry point
├── .env                  # Environment variables (not committed)
├── package.json
└── README.md
```

---

## 📊 Gemini API Free Tier Limits

Here’s what you get **for free**:

### 🧠 Gemini 1.5 Flash

* **15 requests/minute**
* **1,500 requests/day**
* **1 million tokens/minute**
* **Cost**: Free

### 🔍 Gemini 1.5 Pro

* **2 requests/minute**
* **50 requests/day**
* **32k tokens/minute**
* **Cost**: Free

> ⚠️ Limits are generous for prototyping but can be raised with billing enabled.

More info: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

---

## 📚 Credits

* [Original Agent Project (Hendrixer)](https://github.com/Hendrixer/agent-from-scratch)
* [Gemini SDK (docs)](https://ai.google.dev/gemini-api/docs)
* [Google AI Studio](https://aistudio.google.com/u/1/apikey)

---

## 🛠 License

MIT – Use it, modify it, build your own agent!

---

## 🙋‍♀️ Contributions

PRs welcome! Feel free to fork the project, add your own tools, or extend the agent's reasoning abilities.

