import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Badge, 
  Select, 
  ButtonGroup,
  Text,
  Box,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import { Product, ProductVariant } from '../types';
import { formatCurrency } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, variant: ProductVariant) => void;
  onTryOn: (product: Product, variant: ProductVariant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, onTryOn }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const currentVariant = product.variants[selectedVariant];
  
  const sizeOptions = product.variants.map((variant, index) => ({
    label: variant.size,
    value: index.toString()
  }));

  const handleTryOn = () => {
    onTryOn(product, currentVariant);
  };

  const handleAddToCart = () => {
    addToCart(product, currentVariant);
  };

  return (
    <Card>
      <div className="relative">
        <div 
          className="relative overflow-hidden rounded-t-lg"
          style={{ aspectRatio: '3/4' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <Badge tone="success" size="small">New</Badge>
            )}
          </div>
        
          {product.aiOptimized && (
            <div className="absolute top-3 right-3">
              <Badge tone="info" size="small">AI Ready</Badge>
            </div>
          )}
        
          {/* Hover overlay with Try On button */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              variant="primary"
              fullWidth
              onClick={handleTryOn}
              size="large"
            >
              ✨ Try On
            </Button>
          </div>
        </div>
      
        <Box padding="400">
          <BlockStack gap="300">
            <BlockStack gap="100">
              <Text as="h3" variant="bodyMd" fontWeight="medium" truncate>
                {product.title}
              </Text>
              <Text as="p" variant="bodySm" tone="subdued" truncate>
                {product.description}
              </Text>
            </BlockStack>
        
            <InlineStack align="space-between">
              <InlineStack gap="200">
                <Text as="span" variant="bodyLg" fontWeight="semibold">
                  {formatCurrency(currentVariant.price)}
                </Text>
                {currentVariant.compareAtPrice && (
                  <Text as="span" variant="bodySm" tone="subdued" textDecorationLine="line-through">
                    {formatCurrency(currentVariant.compareAtPrice)}
                  </Text>
                )}
              </InlineStack>
              <Badge tone={currentVariant.inventory > 10 ? 'success' : 'warning'}>
                {currentVariant.inventory > 10 ? 'In Stock' : 'Low Stock'}
              </Badge>
            </InlineStack>
        
            <BlockStack gap="300">
              <Select
                label="Size"
                options={sizeOptions}
                value={selectedVariant.toString()}
                onChange={(value) => setSelectedVariant(parseInt(value))}
              />
          
              <Button 
                variant="secondary"
                fullWidth
                onClick={handleAddToCart}
                disabled={currentVariant.inventory === 0}
              >
                Add to Cart
              </Button>
            </BlockStack>
          </BlockStack>
        </Box>
      </div>
    </Card>
  );
};