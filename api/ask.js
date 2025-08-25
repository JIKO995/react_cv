import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { question, knowledge } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You answer questions only based on the given CV knowledge." },
          { role: "user", content: `CV Knowledge:\n${knowledge}` },
          { role: "user", content: `Question: ${question}` },
        ],
        temperature: 0.2,
      });

      res.status(200).json({ answer: completion.choices[0].message.content });
    } catch (err) {
      console.error(err);
      res.status(500).json({ answer: "Error: Could not generate a response." });
    }
  } else {
    res.status(405).end();
  }
}
