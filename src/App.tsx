import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { AppBridgeProvider } from './providers/AppBridgeProvider';
import { ShopifyAppLayout } from './components/ShopifyAppLayout';
import { Dashboard } from './components/Dashboard';
import { ProductManager } from './components/ProductManager';
import { ProductCatalog } from './components/ProductCatalog';
import { TryOnStudio } from './components/TryOnStudio';
import { UserProfile } from './components/UserProfile';
import { Product, ProductVariant, CartItem, User, TryOnResult } from './types';

function App() {
  const [user, setUser] = useState<User>({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    tryOnHistory: []
  });

  // Try-on history management
  const addToTryOnHistory = (tryOnData: TryOnResult) => {
    setUser(prev => ({
      ...prev,
      tryOnHistory: [tryOnData, ...prev.tryOnHistory.slice(0, 9)]
    }));
  };

  // Placeholder functions for Shopify integration
  const addToCart = (product: Product, variant: ProductVariant) => {
    console.log('Adding to Shopify cart:', product, variant);
    // TODO: Integrate with Shopify Cart API
  };

  const onTryOn = (product: Product, variant: ProductVariant) => {
    console.log('Starting try-on for:', product, variant);
    // TODO: Navigate to try-on studio or open widget
  };

  return (
    <AppProvider i18n={{}}>
      <AppBridgeProvider>
        <Router>
          <ShopifyAppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductManager />} />
              <Route 
                path="/catalog" 
                element={<ProductCatalog addToCart={addToCart} onTryOn={onTryOn} />} 
              />
              <Route 
                path="/try-on" 
                element={<TryOnStudio addToCart={addToCart} addToTryOnHistory={addToTryOnHistory} />} 
              />
              <Route path="/customers" element={<UserProfile user={user} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ShopifyAppLayout>
        </Router>
      </AppBridgeProvider>
    </AppProvider>
  );
}

export default App;