export type SignInFlow = "signIn" | "signUp";

export interface FormErrors {
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
}

export interface FormData {
  email: string;
  password: string;
  passwordConfirm?: string;
}
