export const JOB_APPLICATION_SCHEMA = `
{
    "company": "string",
    "url": "string",

    "position": "string",
    "role": "string",
    "seniority": "intern | junior | mid | senior",

    "area": ["string"],
    "skills": ["string"],

    "employmentType": "full_time | part_time | freelance | contract",
    "applicationLanguage": "English | Portuguese | Other | unknown",
    "location": "string",
    "remoteType": "remote | hybrid | onsite | unknown",

    "source": "LinkedIn | Website | Referral | Other | unknown",
    "platform": "string",
    "submissionMethod": "linkedin_easy_apply | company_form | email | referral | unknown",

    "status": "draft",
    "appliedAt": null,
    "confirmationReceived": false,

    "notes": ["string"],

    "signals": {
      "workPace": "slow | moderate | fast | unclear",
      "autonomyLevel": "low | medium | high | unclear",
      "technicalBreadth": "narrow | moderate | broad | unclear",
      "roleClarity": "clear | mixed | vague | unclear",
      "deliveryPressure": "low | medium | high | unclear",
      "environmentSignals": ["string"],
      "interpretationNotes": "string"
    }
}
`;

export const JOB_ANALYSIS_SCHEMA = `{
  jobSchema: {
    alignment: {
      overall: 0.0,
      strongMatches: ["string"],
      partialMatches: ["string"]
    },

    gaps: {
      expectedForLevel: ["string"],
      relevantToRole: ["string"]
    },

    riskProfile: {
      technical: ["string"],
      emotional: ["string"],
      structural: ["string"]
    },

    effortEstimate: "low | medium | high",

    marketSignal: "junior-friendly | stretch | misaligned",

    fitSummary: "string",

    analysisNotes: "string"
  }
}`;
