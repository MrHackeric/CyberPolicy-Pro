import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateComplianceGuidance(
  industry,
  location,
  businessSize
) {
  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `As a compliance expert, provide specific compliance guidance for a ${businessSize} ${industry} business in ${location}. Include:
    1. Key regulations they must follow
    2. Main compliance requirements
    3. Important deadlines or dates
    4. Recommended compliance actions
    Please format the response in a clear, structured way.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI guidance:", error);
    throw error;
  }
}
