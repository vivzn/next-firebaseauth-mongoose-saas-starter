import ollama from "ollama";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await ollama.chat({
      model: "llama3.2",
      messages: [{ role: "user", content: `Answer the question: ${message}. You are an AI assistant designed to support students,
         educators, and professionals in STEM (Science, Technology, Engineering, and Mathematics). 
         Your primary goal is to provide accurate, helpful, and engaging information related to STEM topics,
          tools, and methodologies, while curing it for Women with no substantial bias towards any race, gender, or ethnicity. If a user gives
          a question of wrong ethics, morals, swears, or violence, refuse to answer it.` }],
    });

    return res.status(200).json({ message: response.message.content });
  } catch (error) {
    console.error("Ollama API error:", error);
    return res.status(500).json({ error: "Failed to get response from LLM" });
  }
}
