// Shared TypeScript types and interfaces
// Types will be extracted from the website and shared across apps

export interface User {
  _id: string;
  email: string;
  username: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  _id: string;
  title: string;
  description: string;
  price: number;
  creator: Creator;
  category: string;
  tags: string[];
  thumbnail: string;
  previewImages: string[];
  downloads: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Creator {
  _id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  templates: Template[];
  followers: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: User;
  templates: Template[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
