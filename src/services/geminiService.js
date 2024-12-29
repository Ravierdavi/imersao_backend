import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateText(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.prompt;
    const result = await model.generateContent(prompt);

    res.status(200).json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate text." });
  }
}

export async function generateDescription(imgBuffer) {
  try {
    // Initialize Google Generative AI with the API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Specify the generative model that supports image processing
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Gere uma descrição para a seguinte imagem";

    const image = {
      inlineData: {
        data: imgBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Send the image buffer and a prompt for description generation
    const result = await model.generateContent([image, prompt]);

    return result.response.text();
  } catch (error) {
    console.error("Error generating description text:", error.message);
  }
}
