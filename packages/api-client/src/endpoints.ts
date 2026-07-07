import apiClient from './api';
import type { User, Template, Creator, Order, AuthResponse } from '@craftify/types';

// Auth endpoints
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (email: string, password: string, username: string) =>
    apiClient.post<AuthResponse>('/auth/register', { email, password, username }),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/auth/reset-password', { token, newPassword }),
};

// Template endpoints
export const templateApi = {
  getAll: (params?: any) =>
    apiClient.get<Template[]>('/templates', { params }),
  
  getById: (id: string) =>
    apiClient.get<Template>(`/templates/${id}`),
  
  create: (data: Partial<Template>) =>
    apiClient.post<Template>('/templates', data),
  
  update: (id: string, data: Partial<Template>) =>
    apiClient.put<Template>(`/templates/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/templates/${id}`),
};

// Creator endpoints
export const creatorApi = {
  getAll: () =>
    apiClient.get<Creator[]>('/creators'),
  
  getById: (id: string) =>
    apiClient.get<Creator>(`/creators/${id}`),
};

// Order endpoints
export const orderApi = {
  getMyOrders: () =>
    apiClient.get<Order[]>('/orders/my'),
  
  getById: (id: string) =>
    apiClient.get<Order>(`/orders/${id}`),
  
  create: (data: any) =>
    apiClient.post<Order>('/orders', data),
};

// User endpoints
export const userApi = {
  getProfile: () =>
    apiClient.get<User>('/auth/profile'),
  
  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>('/auth/profile', data),
};
