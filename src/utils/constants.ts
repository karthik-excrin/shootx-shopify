// Application constants
export const POSE_OPTIONS = [
  { label: 'Front View', value: 'front' },
  { label: 'Side View', value: 'side' },
  { label: '3/4 View', value: 'three-quarter' }
] as const;

export const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Tops', value: 'tops' },
  { label: 'Pants', value: 'pants' },
  { label: 'Jackets', value: 'jackets' },
  { label: 'Accessories', value: 'accessories' }
] as const;

export const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 - $200', value: '100-200' },
  { label: 'Over $200', value: '200+' }
] as const;

export const FREE_SHIPPING_THRESHOLD = 75;
export const TAX_RATE = 0.08;
export const SHIPPING_COST = 9.99;

export const IMAGE_QUALITY_THRESHOLDS = {
  EXCELLENT: 85,
  GOOD: 70,
  POOR: 50
} as const;