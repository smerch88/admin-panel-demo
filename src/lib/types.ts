// Base API response structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Paginated response structure
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ===== AUTH TYPES =====

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  createdAt: string;
  updatedAt: string;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response (returns user data, not just token)
export interface LoginResponse {
  message: string;
}

// Register request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
}

// Register response (same as login)
export interface RegisterResponse {
  user: User;
  token: string;
}

// Update user request
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "editor" | "user";
  password?: string;
}

// ===== COLLECTIONS TYPES =====

// Image interface for collections
export interface CollectionImage {
  url: string;
  path: string;
}

// General Image interface for other entities
export interface Image {
  id: string;
  path: string;
  alt?: string;
}

// Long description interface
export interface LongDescription {
  section1: string;
  section2: string;
  section3: string;
  _id: string;
}

// Collection interface
export interface Collection {
  _id: string;
  title: string;
  image: CollectionImage[];
  collected: number;
  target: number;
  alt: string;
  peopleDonate: number;
  peopleDonate_title: string;
  desc: string;
  closedAt: string | null;
  language: string;
  collected_title: string;
  target_title: string;
  term: string | null;
  days: number | null;
  period: string | null;
  comments: string[] | null;
  quantity: number | null;
  currency: string | null;
  long_desc: LongDescription;
  status: "active" | "closed";
  type: string;
  value: string;
  importance: "urgent" | "important" | "non-urgent" | "permanent";
  createdAt: string;
  __v: number;
  translations: string;
}

// Collections response structure
export interface CollectionsResponse {
  activeCollections: Collection[];
  closedCollections: Collection[];
}

// Paginated collections response
export interface PaginatedCollectionsResponse {
  status: number;
  data: CollectionsResponse;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  };
}

// Create collection request (multipart/form-data)
export interface CreateCollectionRequest {
  title: string;
  image: File;
  collected: number;
  target: number;
  alt: string;
  peopleDonate: number;
  peopleDonate_title: string;
  desc: string;
  days?: number;
  period: string;
  quantity?: number;
  status?: "active" | "closed";
  value: string;
  importance: "urgent" | "important" | "non-urgent" | "permanent";
  long_desc: string[];
}

// Update collection request (multipart/form-data)
export interface UpdateCollectionRequest {
  title?: string;
  collected?: number;
  target?: number;
  alt?: string;
  peopleDonate?: number;
  peopleDonate_title?: string;
  desc?: string;
  days?: number;
  period?: string;
  quantity?: number;
  status?: "active" | "closed";
  value?: string;
  importance?: "urgent" | "important" | "non-urgent" | "permanent";
  long_desc?: string[];
  image?: File;
}

// Collection tag interface
export interface CollectionTag {
  id: string;
  name: string;
  color: string;
}

// ===== REPORTS TYPES =====

// Report interface
export interface Report {
  _id: string;
  year: string;
  month: string;
  url: string;
  language: "en" | "ua";
  createdAt?: string;
  updatedAt?: string;
}

// Create report request
export interface CreateReportRequest {
  year: string;
  month: string;
  url: string;
  language: "en" | "ua";
}

// Update report request
export interface UpdateReportRequest {
  year?: string;
  month?: string;
  url?: string;
  language?: "en" | "ua";
}

// ===== PARTNERS TYPES =====

// Partner interface
export interface Partner {
  _id: string;
  image: CollectionImage;
  logo: string;
  link: string;
  language: "en" | "ua";
  createdAt?: string;
  updatedAt?: string;
}

// Create partner request (multipart/form-data)
export interface CreatePartnerRequest {
  image: File;
  logo: string;
  link: string;
  language: "en" | "ua";
}

// Update partner request (multipart/form-data)
export interface UpdatePartnerRequest {
  image?: File;
  logo?: string;
  link?: string;
  language?: "en" | "ua";
}

// ===== MERCH TYPES =====

// Merch interface
export interface Merch {
  status: "on" | "off";
  content: string;
  link: string;
  locale: string;
}

// Update merch request
export interface UpdateMerchRequest {
  status: "on" | "off";
  content: string;
  link: string;
}

// ===== TEAMMATES TYPES =====

// Teammate interface
export interface Teammate {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: CollectionImage;
  locale: "en" | "ua";
  createdAt?: string;
  updatedAt?: string;
}

// Create teammate request (multipart/form-data)
export interface CreateTeammateRequest {
  name: string;
  role: string;
  description: string;
  image: File;
  locale: "en" | "ua";
}

// Update teammate request (multipart/form-data)
export interface UpdateTeammateRequest {
  name?: string;
  role?: string;
  description?: string;
  image?: File;
  locale?: "en" | "ua";
}
