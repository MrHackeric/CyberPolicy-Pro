const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateComplianceAlert(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `As a compliance expert, analyze the following regulatory change or compliance situation and provide a detailed alert:

  Industry: ${data.industry}
  Change Type: ${data.changeType}
  Context: ${data.context}

  Please provide:
  1. A clear title for the alert
  2. Detailed description of the change or situation
  3. Specific actions required for compliance
  4. Assessment of severity (low, medium, high, critical)
  5. Recommended timeline for action

  Format the response in a structured way.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return parseAlertResponse(response.text());
  } catch (error) {
    console.error("Error generating alert:", error);
    throw error;
  }
}

function parseAlertResponse(aiResponse) {
  // Default values in case parsing fails
  let alert = {
    title: "Compliance Update Required",
    description: aiResponse,
    severity: "medium",
    actionRequired: "Review compliance requirements",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };

  try {
    const lines = aiResponse.split("\n");

    // Parse title
    const titleLine = lines.find((line) =>
      line.toLowerCase().includes("title:")
    );
    if (titleLine) {
      alert.title = titleLine.split("title:")[1].trim();
    }

    // Parse severity
    const severityLine = lines.find(
      (line) =>
        line.toLowerCase().includes("severity:") ||
        line.toLowerCase().includes("priority:")
    );
    if (severityLine) {
      const severityText = severityLine.toLowerCase();
      if (severityText.includes("critical")) alert.severity = "critical";
      else if (severityText.includes("high")) alert.severity = "high";
      else if (severityText.includes("low")) alert.severity = "low";
      else alert.severity = "medium";
    }

    // Parse action required
    const actionLine = lines.find(
      (line) =>
        line.toLowerCase().includes("action:") ||
        line.toLowerCase().includes("required:")
    );
    if (actionLine) {
      alert.actionRequired = actionLine.split(":")[1].trim();
    }

    // Parse description
    const descriptionLines = lines.filter(
      (line) =>
        !line.toLowerCase().includes("title:") &&
        !line.toLowerCase().includes("severity:") &&
        !line.toLowerCase().includes("action:")
    );
    alert.description = descriptionLines.join("\n").trim();
  } catch (error) {
    console.error("Error parsing AI response:", error);
    // Use default values set above if parsing fails
  }

  return alert;
}

module.exports = { generateComplianceAlert };
