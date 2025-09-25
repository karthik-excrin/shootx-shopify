// Core types for the application
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  variants: ProductVariant[];
  isNew: boolean;
  aiOptimized: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  tryOnHistory: TryOnResult[];
}

export interface TryOnResult {
  id: number;
  product: Product;
  variant: ProductVariant;
  pose: string;
  userPhoto: string;
  processedAt: string;
  results: {
    front: string;
    side: string;
    'three-quarter': string;
  };
  fitScore: number;
  recommendations: string[];
}

// API related types
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface TryOnAPIRequest {
  userPhoto: string;
  productId: string;
  variantId: string;
  pose: string;
}

export interface TryOnAPIResponse {
  resultImages: {
    front: string;
    side: string;
    'three-quarter': string;
  };
  fitScore: number;
  recommendations: string[];
  processingTime: number;
}