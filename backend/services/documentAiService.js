const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateDocument(type, params) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = "";

  switch (type) {
    case "nda":
      prompt = `Generate a professional Non-Disclosure Agreement (NDA) for ${
        params.companyName
      } in the ${params.industry} industry. 
      Include the following sections:
      1. Parties involved
      2. Definition of confidential information
      3. Obligations of receiving party
      4. Term and termination
      5. Return of confidential information
      6. General provisions
      
      Use these specific details:
      Company Name: ${params.companyName}
      Industry: ${params.industry}
      Duration: ${params.duration || "2 years"}
      State/Country: ${params.location}
      `;
      break;

    case "privacy_policy":
      prompt = `Generate a comprehensive Privacy Policy for ${
        params.companyName
      }, a ${params.industry} company. 
      Include sections on:
      1. Information collection
      2. Use of information
      3. Data storage and security
      4. User rights
      5. Cookie policy
      6. Contact information
      
      Company Details:
      Company Name: ${params.companyName}
      Industry: ${params.industry}
      Location: ${params.location}
      Data Collection Methods: ${
        params.dataCollection || "Standard web forms and cookies"
      }
      `;
      break;

    // Add more document types as needed
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
}

module.exports = { generateDocument };
