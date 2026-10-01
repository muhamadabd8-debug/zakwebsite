"use server";

import { deliverContactSubmission, type ContactSubmission } from "@/lib/contact";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawLang = String(formData.get("lang") ?? "");
  const lang = isLocale(rawLang) ? rawLang : defaultLocale;
  const dict = getDictionary(lang).form.validation;

  // Honeypot: real users never fill this. Return success so bots learn nothing.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success", message: dict.honeypotSuccess };
  }

  const submission: ContactSubmission = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    workEmail: String(formData.get("workEmail") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    opportunity: String(formData.get("opportunity") ?? "").trim(),
    projectLocation: String(formData.get("projectLocation") ?? "").trim(),
    requiredCapability: String(formData.get("requiredCapability") ?? "").trim(),
    projectStage: String(formData.get("projectStage") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    requestCorporateProfile: formData.get("requestCorporateProfile") === "on",
    requestPrequalification: formData.get("requestPrequalification") === "on",
  };

  if (!submission.name || !submission.company || !submission.message) {
    return { status: "error", message: dict.requiredFields };
  }
  if (!EMAIL_RE.test(submission.workEmail)) {
    return { status: "error", message: dict.invalidEmail };
  }

  const result = await deliverContactSubmission(submission);
  if (!result.ok) {
    return { status: "error", message: dict.deliveryFailed };
  }

  return { status: "success", message: dict.success };
}
