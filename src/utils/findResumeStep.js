

import { STEP_ORDER, STEP_REQUIRED_FIELDS } from "@/config/formSteps";
import { useFormStore } from "@/store";

export function findResumeStep() {
  const store = useFormStore.getState();

  for (const step of STEP_ORDER) {
    const requiredFields = STEP_REQUIRED_FIELDS[step];
    if (!requiredFields) continue;

    const stepData = store[step] || {};

    const isComplete = requiredFields.every((field) => {
      const value = stepData[field];

      // ❌ null or undefined → incomplete
      if (value === null || value === undefined) return false;

      // ❌ empty string
      if (typeof value === "string" && value.trim() === "") return false;

      // ❌ empty array
      if (Array.isArray(value) && value.length === 0) return false;

      // ❌ empty object
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0
      ) {
        return false;
      }

      // ✅ valid value (including false, 0, etc.)
      return true;
    });

    if (!isComplete) {
      return step;
    }
  }

  return "thank-you";
}