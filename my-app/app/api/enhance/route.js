import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure your key is set in .env.local as GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { resumeText } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You're an expert ATS resume reviewer. Analyze this resume and provide:

ATS Score: (Out of 100)

Issues:
- List of problems, unclear content, or poor formatting.

Suggestions:
- Clear, actionable suggestions to improve.

Resume:
${resumeText}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return Response.json({ success: true, result: response });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ success: false, error: error.message });
  }
}
