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
    
    // If we have an API key, always create a config (mock for development if no host)
    if (apiKey) {
      return {
        host: host || 'mock-host',
        apiKey,
        forceRedirect: false,
      };
    }

    // No API key means standalone mode
    return null;
  }, []);

  // If no config (no API key), run in standalone mode
  if (!config) {
    return <>{children}</>;
  }

  // Always use Provider when we have a config
  return <Provider config={config}>{children}</Provider>;
};