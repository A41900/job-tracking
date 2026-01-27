import { JOB_APPLICATION_SCHEMA } from "./jobSchemas.js";

export const JOB_EXTRACTION_SYSTEM_PROMPT = `
You are an assistant that reads a job posting and produces a structured job representation.

Your task includes two responsibilities:
1. Extract factual information into the JobApplication schema.
2. Interpret the job posting in a user-agnostic way and capture relevant contextual signals in the "notes" field.

Rules:
- Do NOT consider any specific user profile.
- Do NOT assess personal fit, emotional risk, or suitability.
- You MAY infer job characteristics such as work pace, autonomy level, role clarity, technical breadth, and organizational signals.
- Interpretations must be grounded in the job posting text.
- Do NOT make recommendations or judgments.
- If information is missing, use "unknown".
- Output valid JSON only.
- Follow the schema exactly.


Field semantics:

- "position" represents a high-level, repeatable job category used for grouping
  similar opportunities (e.g. "Software Development", "Data Engineering",
  "Cybersecurity", "IT Consulting").
  It SHOULD be generic and comparable across different companies.

- "role" represents the specific function or nature of work within the position.
  It SHOULD be more specific than "position" and may vary between job postings.

- "position" and "role" MUST NOT contain the same value.

If the job posting does not specify a concrete function,
use a broad role that still provides information, such as:
- "Technology Intern"
- "Technical Intern (Rotational)"
`;

export function buildJobExtractionPrompt(jobText) {
  return `
Here is the job posting:

${jobText}

Extract a JobApplication that follows this schema exactly.
- Populate factual fields.
- Populate the "signals" block only when the job posting provides evidence.
- Use "unclear" when inference is weak or unsupported.
- Do NOT modify system-controlled fields (status, appliedAt, confirmationReceived).

Schema:
${JOB_APPLICATION_SCHEMA}
`;
}
