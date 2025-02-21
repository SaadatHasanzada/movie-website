import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, userService } from "@/features/auth/services/supabase";

import { BookmarkService } from "../services/bookmarkService";
import { ERROR_MESSAGES } from "@/constants";
import { GUEST_BOOKMARKS } from "@/constants";
import { User } from "@supabase/supabase-js";
import { toast } from "react-toastify";

interface BookmarkContextType {
  bookmarks: number[];
  isBookmarked: (mediaId: number) => boolean;
  toggleBookmark: (mediaId: number, mediaType: string) => Promise<void>;
  loading: boolean;
  isGuestUser: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const [isGuestUser, setIsGuestUser] = useState(false);

  // Load initial user
  useEffect(() => {
    const initializeUser = async () => {
      const user = await userService.getUser();
      setCurrentUser(user);
      setIsGuestUser(user?.is_anonymous ?? false);
    };
    initializeUser();
  }, []);

  // Set up auth state listener
  useEffect(() => {
    const subscription = authService.onAuthStateChanged(async (session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      setIsGuestUser(user?.is_anonymous ?? false);

      // Clear bookmarks when user logs out
      if (!user) {
        setBookmarks([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load bookmarks whenever the user changes
  useEffect(() => {
    if (!currentUser) {
      setBookmarks([]);
      return;
    }

    if (isGuestUser) {
      setBookmarks(GUEST_BOOKMARKS);
      return;
    }

    loadUserBookmarks(currentUser.id);
  }, [currentUser, isGuestUser]);

  const loadUserBookmarks = async (userId: string) => {
    try {
      setLoading(true);
      const userBookmarks = await BookmarkService.getUserBookmarks(userId);
      if (userBookmarks) {
        setBookmarks(userBookmarks.map((b) => b.media_id));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = (mediaId: number) => bookmarks.includes(mediaId);
  console.log(isBookmarked);

  const toggleBookmark = async (mediaId: number, mediaType: string) => {
    try {
      if (isGuestUser) {
        toast(ERROR_MESSAGES.ANONYMOUS_USER_ERROR, { type: "info" });
        return;
      }

      setLoading(true);
      const user = await userService.getUser();
      if (!user) throw new Error("User not authenticated");

      const bookmarkData = {
        user_id: user.id,
        media_id: mediaId,
        media_type: mediaType
      };

      if (isBookmarked(mediaId)) {
        await BookmarkService.removeBookmark(bookmarkData);
        setBookmarks((prev) => prev.filter((id) => id !== mediaId));
      } else {
        await BookmarkService.addBookmark(bookmarkData);
        setBookmarks((prev) => [...prev, mediaId]);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, loading, isGuestUser }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider"
    );
  }
  return context;
};

export default BookmarkContext;
