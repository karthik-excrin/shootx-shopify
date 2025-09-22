import { TryOnAPIRequest, TryOnAPIResponse, APIResponse, Product, TryOnResult } from '../types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.yourfashionstore.com';
const API_TIMEOUT = 30000; // 30 seconds for AI processing

// API Client class for centralized API management
class APIClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Try-On API endpoints
  async generateTryOn(request: TryOnAPIRequest): Promise<APIResponse<TryOnAPIResponse>> {
    return this.request<TryOnAPIResponse>('/api/tryon/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Product API endpoints
  async getProducts(): Promise<APIResponse<Product[]>> {
    return this.request<Product[]>('/api/products');
  }

  async getProduct(id: string): Promise<APIResponse<Product>> {
    return this.request<Product>(`/api/products/${id}`);
  }

  // User API endpoints
  async saveTryOnResult(result: TryOnResult): Promise<APIResponse<void>> {
    return this.request<void>('/api/user/tryon-history', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Mock API service for development (remove in production)
export class MockAPIService {
  static async generateTryOn(request: TryOnAPIRequest): Promise<TryOnAPIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - replace with actual API call
    return {
      resultImages: {
        front: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
        side: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400',
        'three-quarter': 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      fitScore: Math.floor(Math.random() * 20) + 80,
      recommendations: [
        'Great fit! This size looks perfect on you.',
        'The color complements your skin tone beautifully.',
        'Consider pairing with neutral accessories.'
      ],
      processingTime: 2000
    };
  }

  static generateImageQualityScore(): number {
    return Math.floor(Math.random() * 30) + 70; // 70-100
  }
}

// API Error handling
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// API Response handlers
export const handleAPIError = (error: unknown): string => {
  if (error instanceof APIError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};