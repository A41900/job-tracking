export const JOB_APPLICATION_SCHEMA = `{
  JobApplication: {
    company: "string",
    url: "string",

    position: "string",
    role: "string",
    area: ["string"],
    skills: ["string"],

    seniority: "intern | junior | mid | senior",
    employmentType: "full_time | part_time | freelance | contract",

    applicationLanguage: "English | Portuguese | Other",
    location: "string",
    remoteType: "remote | hybrid | onsite",

    source: "LinkedIn | Website | Referral | Other",
    platform: "string",
    submissionMethod: "linkedin_easy_apply | company_form | email | referral",

    appliedAt: "YYYY-MM-DD",
    status: "draft | applied | under_review | interview | rejected | offer",
    confirmationReceived: "true | false",

    notes: ["string"],
  },
}`;

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
