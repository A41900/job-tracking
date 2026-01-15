import { z } from "zod";

export const JobApplicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),

  url: z.string().optional().default(""),
  position: z.string().optional().default(""),

  area: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([]),

  seniority: z
    .enum(["intern", "junior", "mid", "senior"])
    .optional()
    .default("intern"),

  employmentType: z
    .enum(["full_time", "part_time", "freelance", "contract"])
    .optional()
    .default("full_time"),

  applicationLanguage: z.string().optional().default("English"),
  location: z.string().optional().default(""),

  remoteType: z
    .enum(["remote", "hybrid", "onsite"])
    .optional()
    .default("remote"),

  source: z.string().optional().default("Other"),
  platform: z.string().optional().default(""),
  submissionMethod: z.string().optional().default("company_form"),

  appliedAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString().split("T")[0]),

  status: z
    .enum([
      "draft",
      "applied",
      "under_review",
      "interview",
      "rejected",
      "offer",
    ])
    .optional()
    .default("draft"),

  confirmationReceived: z.boolean().optional().default(false),

  notes: z.array(z.string()).optional().default([]),
});
