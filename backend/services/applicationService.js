import { z, ZodError } from "zod";
import * as store from "../store.js";
import { JobApplicationSchema } from "../data/jobSchemaZod.js";

export function createApplication(data) {
  const result = JobApplicationSchema.safeParse(data);

  if (!result.success) {
    console.error("ZOD VALIDATION FAILED");
    console.table(
      result.error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
        received: e.received,
      })),
    );

    throw new ZodError(result.error.issues);
  }

  return store.create(result.data);
}
