import { createClient } from "@supabase/supabase-js";

interface SignUpCredentials {
  email: string;
  password: string;
  full_name?: string;
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const authService = {
  signUp: async ({ email, password, full_name }: SignUpCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name
          }
        }
      });
      if (error) {
        console.error("Supabase Error:", {
          message: error.message,
          status: error.status,
          name: error.name,
          stack: error.stack
        });
        throw error;
      }

      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Network Error:", {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
      } else {
        console.error("Unknown Error:", err);
      }
      throw err;
    }
  }
};
