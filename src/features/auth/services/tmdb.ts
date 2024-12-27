import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Types
interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

// Create axios instance
const tmdbApi = axios.create({
  baseURL: BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json"
  }
});

// Auth methods
export const tmdbAuth = {
  getRequestToken: async (): Promise<RequestToken> => {
    try {
      const { data } = await tmdbApi.get<RequestToken>(
        `/authentication/token/new`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get request token");
    }
  }
};
