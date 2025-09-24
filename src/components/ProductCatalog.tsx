import React, { useState, useMemo } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Select, 
  TextField, 
  Text,
  Box,
  InlineStack,
  BlockStack,
  Grid
} from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { Product, ProductVariant } from '../types';
import { CATEGORIES, PRICE_RANGES } from '../utils/constants';
import { filterProducts } from '../utils/helpers';

interface ProductCatalogProps {
  addToCart: (product: Product, variant: ProductVariant) => void;
  onTryOn: (product: Product, variant: ProductVariant) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ addToCart, onTryOn }) => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Memoized filtered products for performance
  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchQuery, selectedCategory, priceRange);
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <Box maxWidth="7xl" paddingInlineStart="600" paddingInlineEnd="600" paddingBlockStart="800" paddingBlockEnd="800">
      <BlockStack gap="800">
        <BlockStack gap="600">
          <InlineStack align="space-between" gap="400" wrap={false}>
            <Box minWidth="20rem">
            <TextField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search products..."
              prefix={<SearchMinor />}
              autoComplete="off"
              label=""
            />
            </Box>
            <InlineStack gap="400">
            <Select
              label=""
              options={CATEGORIES}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <Select
              label=""
              options={PRICE_RANGES}
              value={priceRange}
              onChange={setPriceRange}
            />
            </InlineStack>
          </InlineStack>
        
          <InlineStack align="space-between">
            <Text as="h2" variant="headingLg">
              {filteredProducts.length} Products Found
            </Text>
            <Badge tone="info">
              AI Try-On Available
            </Badge>
          </InlineStack>
        </BlockStack>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                onTryOn={onTryOn}
              />
            ))}
          </div>
        ) : (
          <Box paddingBlockStart="1200" paddingBlockEnd="1200">
            <BlockStack gap="400" align="center">
              <Box 
                width="6rem" 
                height="6rem" 
                background="bg-surface-secondary" 
                borderRadius="full" 
                padding="400"
              >
                <SearchMinor />
              </Box>
              <BlockStack gap="200" align="center">
                <Text as="h3" variant="headingMd">
                  No products found
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                  Try adjusting your search or filter criteria
                </Text>
              </BlockStack>
            </BlockStack>
          </Box>
        )}
      </BlockStack>
    </Box>
  );
};