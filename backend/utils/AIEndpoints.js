import { TextServiceClient } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

//Intialize google generative AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API key is missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
// model to use
const MODEL_NAME = "gemini-1.5-flash";

export const draftDocument = async (templateType, customizations) => {
  try {
    const aiResponse = await genAI.generateText({
      model: MODEL_NAME,
      prompt: `Create a ${templateType} document with the following details: ${JSON.stringify(
        customizations
      )}`,
      temperature: 2,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    });
  } catch (error) {
    console.log(error);
  }
};
