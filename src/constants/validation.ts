export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
} as const;

export const ERROR_MESSAGES = {
  EMAIL_INVALID: "Please enter a valid email address",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MISMATCH: "Passwords do not match",
  PASSWORD_INVALID:
    "Password must be at least 8 characters long and include both letters and numbers"
} as const;
