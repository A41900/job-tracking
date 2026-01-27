import fs from "fs";
import client from "../openaiClient.js";
import {
  JOB_EXTRACTION_SYSTEM_PROMPT,
  buildJobExtractionPrompt,
} from "../data/jobPrompts.js";

export async function extractJobApplication(jobText) {
  console.log("ENABLE_EXTRACTION =", process.env.ENABLE_EXTRACTION);
  if (process.env.ENABLE_EXTRACTION === "false") {
    throw new Error("Job extraction is disabled");
  }
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    input: [
      { role: "system", content: JOB_EXTRACTION_SYSTEM_PROMPT },
      { role: "user", content: buildJobExtractionPrompt(jobText) },
    ],
  });

  fs.appendFileSync(
    "openai-usage.log",
    JSON.stringify({
      date: new Date().toISOString(),
      model: "gpt-4.1-mini",
      inputChars: jobText.length,
      usage: response.usage,
    }) + "\n",
  );

  const raw = response.output_text;
  return JSON.parse(raw);
}
