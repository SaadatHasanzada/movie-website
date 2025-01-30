import { Session, createClient } from "@supabase/supabase-js";

import { User } from "@supabase/supabase-js";

interface AuthCredentials {
  email: string;
  password: string;
}
interface UpdateProfilePhotoParams {
  file: File;
  user: User;
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
      data: { session }
    } = await supabase.auth.getSession();
    return !!session;
  },
  onAuthStateChanged: (
    callback: (session: Session | null, event?: string) => void
  ) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session, event);
    }).data.subscription;
  }
};

export const userService = {
  getUser: async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      return user;
    } catch (err) {
      handleError(err);
    }
  },
  uploadProfilePhoto: async ({ file, user }: UpdateProfilePhotoParams) => {
    try {
      // Generate a unique file path
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("profile-photos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true // Enable upsert to replace existing files
        });

      if (uploadError) throw uploadError;

      // Get the public URL for the uploaded file

      const {
        data: { publicUrl }
      } = supabase.storage.from("profile-photos").getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      handleError(err);
    }
  },
  deleteProfilePhoto: async (user: User) => {
    try {
      const filePath = user.user_metadata.image;
      if (!filePath) return;

      const { error: deleteError } = await supabase.storage
        .from("profile-photos")
        .remove([filePath]);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          image: null
        }
      });
      if (updateError) throw updateError;
      return true;
    } catch (err) {
      handleError(err);
      throw err;
    }
  },
  updateUser: async (profile: Partial<User>) => {
    try {
      const { data, error } = await supabase.auth.updateUser(profile);

      if (error) throw error;
      console.log(data);
      return data;
    } catch (err) {
      handleError(err);
    }
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
