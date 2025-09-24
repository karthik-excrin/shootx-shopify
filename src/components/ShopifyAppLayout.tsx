import React from 'react';
import { Frame, Navigation, TopBar, Toast } from '@shopify/polaris';
import { HomeIcon, ProductIcon, CustomersIcon, AnalyticsMajor } from '@shopify/polaris-icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface ShopifyAppLayoutProps {
  children: React.ReactNode;
}

export const ShopifyAppLayout: React.FC<ShopifyAppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/',
            selected: location.pathname === '/',
            onClick: () => navigate('/'),
          },
          {
            label: 'AI Try-On Studio',
            icon: ProductIcon,
            url: '/try-on',
            selected: location.pathname === '/try-on',
            onClick: () => navigate('/try-on'),
          },
          {
            label: 'Product Catalog',
            icon: ProductIcon,
            url: '/products',
            selected: location.pathname === '/products',
            onClick: () => navigate('/products'),
          },
          {
            label: 'Customer Insights',
            icon: CustomersIcon,
            url: '/customers',
            selected: location.pathname === '/customers',
            onClick: () => navigate('/customers'),
          },
          {
            label: 'Analytics',
            icon: AnalyticsMajor,
            url: '/analytics',
            selected: location.pathname === '/analytics',
            onClick: () => navigate('/analytics'),
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [
                { content: 'Settings', onAction: () => navigate('/settings') },
                { content: 'Help', onAction: () => window.open('https://help.shopify.com', '_blank') },
              ],
            },
          ]}
          name="Store Admin"
          detail="AI Fashion Try-On App"
        />
      }
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={false}
    >
      {children}
    </Frame>
  );
};