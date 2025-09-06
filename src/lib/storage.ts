import { User } from "./types";

// LocalStorage keys
const STORAGE_KEYS = {
  USER: "admin_panel_user",
  TOKEN: "admin_panel_token",
} as const;

// User storage utilities
export const userStorage = {
  // Save user data to localStorage
  setUser: (user: User): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  },

  // Get user data from localStorage
  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        try {
          return JSON.parse(userData) as User;
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          return null;
        }
      }
    }
    return null;
  },

  // Remove user data from localStorage
  removeUser: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return userStorage.getUser() !== null;
  },
};

// Token storage utilities (if needed for future use)
export const tokenStorage = {
  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  },
};

// Clear all auth data
export const clearAuthData = (): void => {
  userStorage.removeUser();
  tokenStorage.removeToken();
};
