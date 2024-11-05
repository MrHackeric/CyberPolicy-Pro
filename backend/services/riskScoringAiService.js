import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeRiskFactors(companyData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `As a compliance risk expert, analyze the following company data and provide detailed risk factors and recommendations:
  
  Industry: ${companyData.industry}
  Data Handling Practices: ${companyData.dataHandling}
  Security Measures: ${companyData.securityMeasures}
  Employee Training Status: ${companyData.employeeTraining}
  
  Please provide:
  1. Specific risk factors identified
  2. Severity level for each risk
  3. Prioritized recommendations to improve compliance
  4. Potential impact of implementing recommendations`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating risk analysis:", error);
    throw error;
  }
}

export function calculateScores(assessmentData) {
  // Calculate individual scores
  const dataHandlingScore = calculateDataHandlingScore(
    assessmentData.dataHandling
  );
  const securityScore = calculateSecurityScore(assessmentData.securityMeasures);
  const trainingScore = calculateTrainingScore(assessmentData.employeeTraining);

  // Calculate weighted overall score
  const overallScore = (
    dataHandlingScore * 0.4 +
    securityScore * 0.4 +
    trainingScore * 0.2
  ).toFixed(2);

  return {
    dataHandlingScore,
    securityMeasuresScore: securityScore,
    employeeTrainingScore: trainingScore,
    overallScore: parseFloat(overallScore),
  };
}

function calculateDataHandlingScore(dataHandling) {
  let score = 100;

  // Example scoring logic
  if (!dataHandling.dataEncryption) score -= 20;
  if (!dataHandling.dataClassification) score -= 15;
  if (!dataHandling.retentionPolicies) score -= 15;
  if (!dataHandling.accessControls) score -= 20;
  if (!dataHandling.dataBackup) score -= 15;
  if (!dataHandling.incidentResponse) score -= 15;

  return Math.max(0, score);
}

function calculateSecurityScore(security) {
  let score = 100;

  // Example scoring logic
  if (!security.firewall) score -= 20;
  if (!security.antivirusSoftware) score -= 15;
  if (!security.regularUpdates) score -= 15;
  if (!security.passwordPolicy) score -= 20;
  if (!security.twoFactorAuth) score -= 15;
  if (!security.securityAudit) score -= 15;

  return Math.max(0, score);
}

function calculateTrainingScore(training) {
  let score = 100;

  // Example scoring logic
  if (!training.regularTraining) score -= 30;
  if (!training.awarenessProgram) score -= 20;
  if (!training.phishingTests) score -= 25;
  if (!training.policyAcknowledgement) score -= 25;

  return Math.max(0, score);
}
