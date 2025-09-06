import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image URL utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_BASE_URL = `${API_BASE_URL!.replace("/api", "")}/images/all/`;

export function getImageUrl(path: string): string {
  if (!path) return "";
  return `${IMAGE_BASE_URL}${path}`;
}

export function getCollectionImageUrls(
  images: Array<{ path: string; url?: string }>
): string[] {
  return images
    .filter(img => img.path && img.path.trim() !== "")
    .map(img => getImageUrl(img.path));
}
