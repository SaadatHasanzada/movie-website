import { ERROR_MESSAGES, PATTERNS } from "@/constants/validation";

interface EmailValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

export const validateEmail = (email: string): EmailValidationResult => {
  if (email.length === 0) {
    return { isValid: false, errorMessage: ERROR_MESSAGES.EMAIL_REQUIRED };
  }
  if (!PATTERNS.EMAIL.test(email)) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.EMAIL_INVALID
    };
  }
  return { isValid: true, errorMessage: null };
};
