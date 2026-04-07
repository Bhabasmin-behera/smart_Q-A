// 

const Groq = require("groq-sdk");
console.log("API KEY:", process.env.GROQ_API_KEY);
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.askLLM = async (question, docs) => {
const context = docs.map(d => d.content).join("\n");

    const prompt = `
Answer ONLY from context.
If not found, say "Not found in provided documents".


Context:
${context}

Question:
${question}

Return JSON:
{
 "answer": "",
 "sources": ["DOC_ID"],
 "confidence": "high | medium | low"
}
`;

    const res = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }]
    });

    return res.choices[0].message.content;
};