import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, Frame, Box } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Header } from './components/Header';
import { AppTopBar } from './components/AppTopBar';
import { ProductCatalog } from './components/ProductCatalog';
import { TryOnStudio } from './components/TryOnStudio';
import { TryOnWidget } from './components/TryOnWidget';
import { UserProfile } from './components/UserProfile';
import { ShoppingCart } from './components/ShoppingCart';
import { Product, ProductVariant, CartItem, User, TryOnResult } from './types';

function App() {
  // State management with proper typing
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isTryOnWidgetOpen, setIsTryOnWidgetOpen] = useState(false);
  const [selectedTryOnProduct, setSelectedTryOnProduct] = useState<Product | null>(null);
  const [selectedTryOnVariant, setSelectedTryOnVariant] = useState<ProductVariant | null>(null);
  const [user, setUser] = useState<User>({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    tryOnHistory: []
  });

  // Cart management functions
  const addToCart = (product: Product, variant: ProductVariant) => {
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.product.id === product.id && item.variant.id === variant.id
      );
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
  };

  const updateCartItem = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => 
        !(item.product.id === productId && item.variant.id === variantId)
      ));
    } else {
      setCartItems(prev => prev.map(item => 
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Try-on history management
  const addToTryOnHistory = (tryOnData: TryOnResult) => {
    setUser(prev => ({
      ...prev,
      tryOnHistory: [tryOnData, ...prev.tryOnHistory.slice(0, 9)]
    }));
  };

  // Try-on widget management
  const handleTryOn = (product: Product, variant: ProductVariant) => {
    setSelectedTryOnProduct(product);
    setSelectedTryOnVariant(variant);
    setIsTryOnWidgetOpen(true);
  };

  const handleCloseTryOnWidget = () => {
    setIsTryOnWidgetOpen(false);
  };

  return (
    <AppProvider i18n={{}}>
      <Router>
        <Frame topBar={<AppTopBar cartItems={cartItems} />}>
          <Box minHeight="100vh" background="bg-surface-secondary">
            <Header />
            <main>
              <Routes>
                <Route 
                  path="/" 
                  element={<ProductCatalog addToCart={addToCart} onTryOn={handleTryOn} />} 
                />
                <Route 
                  path="/try-on" 
                  element={
                    <TryOnStudio 
                      addToCart={addToCart} 
                      addToTryOnHistory={addToTryOnHistory}
                    />
                  } 
                />
                <Route 
                  path="/profile" 
                  element={<UserProfile user={user} />} 
                />
                <Route 
                  path="/cart" 
                  element={
                    <ShoppingCart 
                      cartItems={cartItems} 
                      updateCartItem={updateCartItem}
                    />
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            {/* Floating Try-On Widget */}
            <TryOnWidget
              isOpen={isTryOnWidgetOpen}
              onClose={handleCloseTryOnWidget}
              selectedProduct={selectedTryOnProduct}
              selectedVariant={selectedTryOnVariant}
              onProductChange={(product: Product, variant: ProductVariant) => {
                setSelectedTryOnProduct(product);
                setSelectedTryOnVariant(variant);
              }}
              addToCart={addToCart}
            />
          </Box>
        </Frame>
      </Router>
    </AppProvider>
  );
}

export default App;