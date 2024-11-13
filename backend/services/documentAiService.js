import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateDocument(type, params) {
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
  
      case "employment_contract":
        prompt = `Generate a professional Employment Contract for ${
          params.employeeName
        } at ${
          params.companyName
        }, in the ${params.industry} industry. 
      
        Include the following sections:
        1. Job Title: The title of the position.
        2. Position Description: A brief description of the job role.
        3. Start Date: The start date of the employment.
        4. End Date: The end date or term of the contract.
        5. Salary: The salary for the position.
        6. Benefits: Any benefits associated with the job.
        7. Work Hours: The standard working hours for the role.
        8. Work Location: The location where the employee will be working.
        9. Confidentiality Agreement: Any confidentiality clauses the employee agrees to.
        10. Termination Conditions: The conditions under which the employment can be terminated.
        11. General Provisions: Other terms such as dispute resolution, etc.
      
        Use these specific details:
        - Employer Name: ${params.employerName}
        - Employee Name: ${params.employeeName}
        - Job Title: ${params.jobTitle}
        - Start Date: ${params.startDate}
        - End Date: ${params.endDate || "TBD"}
        - Salary: ${params.salary || "Negotiable"}
        - Benefits: ${params.benefits || "Healthcare, Paid Time Off"}
        - Work Hours: ${params.workHours || "9 AM - 5 PM"}
        - Location: ${params.location || "Company Headquarters"}
        - Confidentiality: ${params.confidentiality || "Standard confidentiality agreement"}
        - Termination: ${params.termination || "Notice period of 30 days"}
        `;
        break;
      
  
      case "company_policy":
        prompt = `Generate a professional Company Policy for ${
          params.policyName
        } at ${
          params.companyName
        }, a ${params.industry} company. 
      
        Include the following sections:
        1. Policy Overview: Brief description of the policy.
        2. Purpose: The purpose of this policy.
        3. Effective Date: When this policy takes effect.
        4. Review Date: The next review date for this policy.
        5. Applicability: Who this policy applies to.
        6. Responsibilities: Who is responsible for implementing and enforcing this policy.
        7. Consequences: What happens if the policy is violated.
        8. Policy Owner: The person or department responsible for the policy.
        9. Approval Status: The status of policy approval (approved, pending, etc.).
      
        Use these specific details:
        - Policy Name: ${params.policyName}
        - Policy Description: ${params.policyDescription}
        - Purpose: ${params.policyPurpose}
        - Effective Date: ${params.effectiveDate}
        - Review Date: ${params.reviewDate}
        - Applicability: ${params.applicability}
        - Responsibilities: ${params.responsibility}
        - Consequences: ${params.consequences}
        - Policy Owner: ${params.policyOwner}
        - Approval Status: ${params.approvalStatus}
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
