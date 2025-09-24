import React, { useMemo } from 'react';
import { Provider } from '@shopify/app-bridge-react';
import { Banner, Layout, Page } from '@shopify/polaris';

interface AppBridgeProviderProps {
  children: React.ReactNode;
}

export const AppBridgeProvider: React.FC<AppBridgeProviderProps> = ({ children }) => {
  const config = useMemo(() => {
    const host = new URLSearchParams(location.search).get('host');
    const apiKey = import.meta.env.VITE_SHOPIFY_API_KEY;
    
    // Only create config if we have both API key and a real host from Shopify
    if (apiKey && host) {
      return {
        host,
        apiKey,
        forceRedirect: false,
      };
    }

    // No API key or no host means standalone mode
    return null;
  }, []);

  // If no config (no API key or no host), run in standalone mode
  if (!config) {
    return <>{children}</>;
  }

  // Use Provider only when we have valid config with real host
  return <Provider config={config}>{children}</Provider>;
};