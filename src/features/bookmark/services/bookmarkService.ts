import { handleError } from "@/lib/utils";
import { supabase } from "../../auth/services/supabase";

interface BookmarkData {
  user_id: string;
  media_id: number;
  media_type: string;
}
export const BookmarkService = {
  addBookmark: async (bookmark: BookmarkData) => {
    try {
      const { data, error } = await supabase.from("bookmarks").insert(bookmark);

      if (error) throw error;
      return data;
    } catch (err) {
      handleError(err);
    }
  },
  removeBookmark: async (bookmark: BookmarkData) => {
    try {
      const { error, data } = await supabase
        .from("bookmarks")
        .delete()
        .eq("media_id", bookmark.media_id);
      // {
      //   user_id: bookmark.user_id,
      //   media_id: bookmark.media_id,
      //   media_type: bookmark.media_type
      // }
      if (error) throw error;
      return true;
    } catch (err) {
      handleError(err);
    }
  },
  getUserBookmarks: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    } catch (err) {
      handleError(err);
    }
  },
  isBookmarked: async (bookmark: BookmarkData) => {
    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .match({
          user_id: bookmark.user_id,
          media_id: bookmark.media_id,
          media_type: bookmark.media_type
        });

      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      handleError(err);
    }
  }
};
