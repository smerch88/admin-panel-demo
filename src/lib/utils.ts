import { Image, CollectionImage } from "./types";

// Base URL for images
const IMAGE_BASE_URL = "https://inharmony-v1.h.goit.study/images/all/";

/**
 * Get full image URL from image object
 * @param image - Image object with path
 * @returns Full URL to the image
 */
export const getImageUrl = (image: Image): string => {
  return `${IMAGE_BASE_URL}${image.path}`;
};

/**
 * Get full image URL from collection image object
 * @param image - CollectionImage object with url and path
 * @returns Full URL to the image
 */
export const getCollectionImageUrl = (image: CollectionImage): string => {
  return image.url;
};

/**
 * Get full image URL from image path string
 * @param path - Image path
 * @returns Full URL to the image
 */
export const getImageUrlFromPath = (path: string): string => {
  return `${IMAGE_BASE_URL}${path}`;
};

/**
 * Format date to readable string
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Get user from localStorage
 * @returns User object or null
 */
export const getStoredUser = () => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Check if user is admin
 * @returns boolean
 */
export const isAdmin = (): boolean => {
  const user = getStoredUser();
  return user?.role === "admin";
};

/**
 * Check if user is editor or admin
 * @returns boolean
 */
export const isEditorOrAdmin = (): boolean => {
  const user = getStoredUser();
  return user?.role === "admin" || user?.role === "editor";
};
