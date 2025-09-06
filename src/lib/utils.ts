import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image utility functions
const IMAGE_BASE_URL = "https://inharmony-v1.h.goit.study/images/all/";

export function getImageUrl(imageData: unknown): string | null {
  if (!imageData) return null;

  // Handle array of images
  if (Array.isArray(imageData) && imageData.length > 0) {
    const firstImage = imageData[0];
    if (firstImage && typeof firstImage === "object") {
      // Check for url field first (if it's a full URL, use it directly)
      if (
        "url" in firstImage &&
        typeof (firstImage as { url: string }).url === "string"
      ) {
        const url = (firstImage as { url: string }).url;
        if (url.trim() !== "") {
          // If it's already a full URL, return as is
          if (url.startsWith("http")) {
            return url;
          }
          // If it's a relative path, prepend the base URL
          return `${IMAGE_BASE_URL}${url}`;
        }
      }
      // Fallback to path field (this is the main field for your images)
      if (
        "path" in firstImage &&
        typeof (firstImage as { path: string }).path === "string"
      ) {
        const path = (firstImage as { path: string }).path;
        if (path.trim() !== "") {
          return `${IMAGE_BASE_URL}${path}`;
        }
      }
    }
  }

  // Handle single image object
  if (imageData && typeof imageData === "object") {
    // Check for url field first (if it's a full URL, use it directly)
    if (
      "url" in imageData &&
      typeof (imageData as { url: string }).url === "string"
    ) {
      const url = (imageData as { url: string }).url;
      if (url.trim() !== "") {
        // If it's already a full URL, return as is
        if (url.startsWith("http")) {
          return url;
        }
        // If it's a relative path, prepend the base URL
        return `${IMAGE_BASE_URL}${url}`;
      }
    }
    // Fallback to path field (this is the main field for your images)
    if (
      "path" in imageData &&
      typeof (imageData as { path: string }).path === "string"
    ) {
      const path = (imageData as { path: string }).path;
      if (path.trim() !== "") {
        return `${IMAGE_BASE_URL}${path}`;
      }
    }
  }

  // Handle string URL (direct URL or path)
  if (typeof imageData === "string" && imageData.trim() !== "") {
    const trimmedPath = imageData.trim();
    // If it's already a full URL, return as is
    if (trimmedPath.startsWith("http")) {
      return trimmedPath;
    }
    // If it's just a path, prepend the base URL
    return `${IMAGE_BASE_URL}${trimmedPath}`;
  }

  return null;
}

export function isValidImageUrl(url: string | null): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmedUrl = url.trim();
  if (trimmedUrl === "") return false;

  // Check if it's a valid URL
  try {
    new URL(trimmedUrl);
    return true;
  } catch {
    return false;
  }
}
