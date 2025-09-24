import { useState, useEffect } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-react';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: Array<{
    id: string;
    src: string;
    alt?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    inventory_quantity: number;
    option1?: string;
    option2?: string;
    option3?: string;
  }>;
}

interface ShopifyCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const useShopifyData = () => {
  const app = useAppBridge();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [customers, setCustomers] = useState<ShopifyCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const makeAuthenticatedRequest = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = await getSessionToken(app);
      const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('API request failed:', err);
      throw err;
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await makeAuthenticatedRequest('/products');
      setProducts(data.products || []);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await makeAuthenticatedRequest('/customers');
      setCustomers(data.customers || []);
    } catch (err) {
      setError('Failed to fetch customers');
      console.error('Error fetching customers:', err);
    }
  };

  const createProduct = async (productData: Partial<ShopifyProduct>) => {
    try {
      const data = await makeAuthenticatedRequest('/products', {
        method: 'POST',
        body: JSON.stringify({ product: productData }),
      });
      await fetchProducts(); // Refresh products list
      return data.product;
    } catch (err) {
      setError('Failed to create product');
      throw err;
    }
  };

  const updateProduct = async (productId: string, productData: Partial<ShopifyProduct>) => {
    try {
      const data = await makeAuthenticatedRequest(`/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ product: productData }),
      });
      await fetchProducts(); // Refresh products list
      return data.product;
    } catch (err) {
      setError('Failed to update product');
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchCustomers()]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [app]);

  return {
    products,
    customers,
    loading,
    error,
    refetch: () => Promise.all([fetchProducts(), fetchCustomers()]),
    createProduct,
    updateProduct,
  };
};