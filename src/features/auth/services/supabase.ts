import { Session, createClient } from "@supabase/supabase-js";

interface AuthCredentials {
  email: string;
  password: string;
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const authService = {
  signUp: async ({ email, password }: AuthCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (err) {
      handleError(err);
    }
  },

  signIn: async ({ email, password }: AuthCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (err) {
      handleError(err);
    }
  },
  signOut: async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      handleError(err);
    }
  },
  isAuthenticated: async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user !== null;
  },
  onAuthStateChanged: (callback: (session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((_, session) => {
      callback(session);
    }).data.subscription;
  }
};

// Error handling utility
const handleError = (err: unknown) => {
  if (err instanceof Error) {
    const errorDetails = {
      message: err.message,
      name: err.name,
      stack: err.stack
    };

    if ("status" in err) {
      console.error("Supabase Error:", {
        ...errorDetails,
        status: (err as any).status
      });
    } else {
      console.error("Network Error:", errorDetails);
    }
  } else {
    console.error("Unknown Error:", err);
  }
  throw err;
};
