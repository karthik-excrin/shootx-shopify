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
    
    if (!host) {
      return null;
    }

    return {
      host,
      apiKey,
      forceRedirect: true,
    };
  }, []);

  if (!config) {
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

  return (
    <Provider config={config}>
      {children}
    </Provider>
  );
};