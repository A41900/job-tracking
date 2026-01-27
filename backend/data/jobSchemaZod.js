import { z } from "zod";

const SignalsSchema = z.object({
  workPace: z.enum(["unclear", "slow", "moderate", "fast"]).optional(),
  autonomyLevel: z.enum(["unclear", "low", "medium", "high"]).optional(),
  technicalBreadth: z
    .enum(["unclear", "narrow", "moderate", "broad"])
    .optional(),
  roleClarity: z.enum(["unclear", "clear", "mixed", "vague"]).optional(),
  deliveryPressure: z.enum(["unclear", "low", "medium", "high"]).optional(),

  environmentSignals: z.array(z.string()).optional().default([]),
  interpretationNotes: z.string().optional().default(""),
});

export const JobApplicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  isActive: z.boolean().default(true),
  archivedReason: z
    .enum(["timeout", "rejected", "withdrawn", "offer_accepted"])
    .optional(),

  url: z.string().optional().default(""),
  position: z.string().optional().default(""),

  area: z.array(z.string()).optional().default([]),
  skills: z.array(z.string()).optional().default([]),

  seniority: z
    .enum(["intern", "junior", "mid", "senior"])
    .optional()
    .default("intern"),

  employmentType: z
    .enum(["full_time", "part_time", "freelance", "contract", "unknown"])
    .nullish()
    .default("unknown"),

  remoteType: z
    .enum(["remote", "hybrid", "onsite", "unknown"])
    .nullish()
    .default("unknown"),

  applicationLanguage: z.string().optional().default("English"),
  location: z.string().optional().default(""),

  source: z.string().optional().default("Other"),
  platform: z.string().optional().default(""),
  submissionMethod: z.string().optional().default("company_form"),

  appliedAt: z
    .string()
    .nullish()
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

  signals: SignalsSchema.optional().default(null),
});
