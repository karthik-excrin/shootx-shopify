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
    
    // For development/preview, allow running without Shopify Admin
    if (!host && !apiKey) {
      return null; // Run in standalone mode
    }

    // If we have an API key but no host, create a mock config for development
    if (!host && apiKey) {
      return {
        host: 'mock-host',
        apiKey,
        forceRedirect: false,
      };
    }

    return {
      host,
      apiKey,
      forceRedirect: true,
    };
  }, []);

  // If no config and no API key, run in standalone mode
  if (!config && !import.meta.env.VITE_SHOPIFY_API_KEY) {
    return <>{children}</>;
  }

  // Show error only if we're trying to use Shopify features but missing required config
  if (!config && import.meta.env.VITE_SHOPIFY_API_KEY) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Banner status="critical">
              <p>
                This app must be viewed from the Shopify Admin. Please install and open the app from your Shopify Admin.
              </p>
            </Banner>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  // If we have a config, use the Provider, otherwise run standalone
  return config ? (
    <Provider config={config}>{children}</Provider>
  ) : (
    <>{children}</>
  );
};