import * as store from "./store.js";
import { JobApplicationSchema } from "./data/jobSchemaZod.js";

export function createApplication(data) {
  const application = JobApplicationSchema.parse(data);
  return store.create(application);
}
