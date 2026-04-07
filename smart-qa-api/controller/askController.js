const { getRelevantDocs } = require("../services/retrievalService");
const { askLLM } = require("../services/llmService");



exports.ask = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question required" });
        }

        const docs = await getRelevantDocs(question);

        if (!docs.length) {
            return res.json({
                answer: "Not found in provided documents",
                sources: [],
                confidence: "low"
            });
        }

        const raw = await askLLM(question, docs);

        console.log("RAW LLM RESPONSE:", raw); // 🔥 DEBUG


        let answer = "Not found";

        try {
            const jsonMatch = raw.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                answer = parsed.answer; // ✅ defined here
            }
        } catch (err) {
            console.log("JSON parse failed, using raw text");
            answer = raw;
        }

        // ✅ sources from DB
        const sources = docs.map(d => d._id.toString());

        let confidence = "low";

        const topScore = docs[0]?.score || 0;

        if (topScore > 5) confidence = "high";
        else if (topScore > 2) confidence = "medium";

        // 🎯 FINAL RESPONSE
        res.json({
            answer,
            sources,
            confidence
        });

    } catch (err) {
        console.error("ASK ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
};