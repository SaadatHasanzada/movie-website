import { ERROR_MESSAGES, PATTERNS } from "@/constants";

interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

export const validateEmail = (email: string): ValidationResult => {
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
export const validatePassword = (password: string): ValidationResult => {
  if (password.length === 0) {
    return { isValid: false, errorMessage: ERROR_MESSAGES.PASSWORD_REQUIRED };
  }
  if (!PATTERNS.PASSWORD.test(password)) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.PASSWORD_INVALID
    };
  }
  return { isValid: true, errorMessage: null };
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, errorMessage: ERROR_MESSAGES.PASSWORD_MISMATCH };
  }
  return { isValid: true, errorMessage: null };
};
