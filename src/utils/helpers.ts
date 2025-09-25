import { Product, ProductVariant, CartItem } from '../types';
import { FREE_SHIPPING_THRESHOLD, TAX_RATE, SHIPPING_COST, IMAGE_QUALITY_THRESHOLDS } from './constants';

// Cart calculations
export const calculateCartSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
};

export const calculateShipping = (subtotal: number): number => {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * TAX_RATE;
};

export const calculateCartTotal = (cartItems: CartItem[]): {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
} => {
  const subtotal = calculateCartSubtotal(cartItems);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};

// Product filtering
export const filterProducts = (
  products: Product[],
  searchQuery: string,
  category: string,
  priceRange: string
): Product[] => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'all' || product.category === category;
    
    const matchesPrice = (() => {
      if (priceRange === 'all') return true;
      const price = product.variants[0].price;
      switch (priceRange) {
        case '0-50': return price < 50;
        case '50-100': return price >= 50 && price < 100;
        case '100-200': return price >= 100 && price < 200;
        case '200+': return price >= 200;
        default: return true;
      }
    })();

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

// Image quality assessment
export const getImageQualityStatus = (score: number): 'success' | 'warning' | 'critical' => {
  if (score >= IMAGE_QUALITY_THRESHOLDS.EXCELLENT) return 'success';
  if (score >= IMAGE_QUALITY_THRESHOLDS.GOOD) return 'warning';
  return 'critical';
};

export const getImageQualityMessage = (score: number): string => {
  if (score < IMAGE_QUALITY_THRESHOLDS.POOR) {
    return "⚠️ Low quality detected. Consider uploading a clearer image for better results.";
  }
  if (score < IMAGE_QUALITY_THRESHOLDS.EXCELLENT) {
    return "💡 Good quality! For even better results, try a clearer image with better lighting.";
  }
  return "✅ Excellent image quality!";
};

// File handling
export const handleFileUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsDataURL(file);
  });
};

// Download functionality
export const downloadImage = (imageUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Generate unique IDs
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};