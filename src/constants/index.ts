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
    "Password must be at least 8 characters long and include both letters and numbers",
  USER_EXISTS: "User already registered",
  NETWORK_ERROR: "Something went wrong",
  LOGIN_FAILURE: "Invalid login credentials",
  FILE_SIZE: "File size exceeds the limit",
  ANONYMOUS_USER_ERROR: "Please create an account to access this feature"
} as const;

export const ROUTES = {
  HOME: "/home",
  MOVIES: "/movies",
  SERIES: "/series",
  BOOKMARKS: "/bookmarks",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  PROFILE: "/profile",
  LANDING: "/"
} as const;

interface SearchPlaceholders {
  [key: string]: string;
  movies: string;
  series: string;
  bookmarks: string;
  default: string;
}
export const SEARCH_PLACEHOLDERS: SearchPlaceholders = {
  movies: "Search for movies",
  series: "Search for TV series",
  bookmarks: "Search for bookmarked shows",
  default: "Search for movies or TV series"
} as const;
