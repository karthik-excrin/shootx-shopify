import React from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  Badge,
  DataTable,
  Button,
  ButtonGroup,
  Box,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import { useShopifyData } from '../hooks/useShopifyData';

export const Dashboard: React.FC = () => {
  const { products, customers, loading } = useShopifyData();

  const tryOnStats = {
    totalTryOns: 1247,
    conversionRate: 23.5,
    avgFitScore: 87,
    topProduct: 'Elegant Floral Midi Dress'
  };

  const recentTryOns = [
    ['Customer A', 'Elegant Floral Midi Dress', '92%', 'Purchased'],
    ['Customer B', 'Classic White Button-Up', '88%', 'Saved'],
    ['Customer C', 'High-Waisted Denim Jeans', '95%', 'Purchased'],
    ['Customer D', 'Cozy Knit Sweater', '84%', 'Shared'],
    ['Customer E', 'Little Black Dress', '91%', 'Purchased'],
  ];

  if (loading) {
    return (
      <Page title="Dashboard">
        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="400">
                <Text as="p">Loading dashboard data...</Text>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="AI Fashion Try-On Dashboard"
      subtitle="Monitor your AI try-on performance and customer engagement"
      primaryAction={{
        content: 'View Analytics',
        url: '/analytics'
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <Box padding="400">
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Total Try-Ons</Text>
                    <Text as="p" variant="heading2xl">{tryOnStats.totalTryOns.toLocaleString()}</Text>
                    <Badge tone="success">+12% this month</Badge>
                  </BlockStack>
                </Box>
              </Card>

              <Card>
                <Box padding="400">
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Conversion Rate</Text>
                    <Text as="p" variant="heading2xl">{tryOnStats.conversionRate}%</Text>
                    <Badge tone="success">+3.2% this month</Badge>
                  </BlockStack>
                </Box>
              </Card>

              <Card>
                <Box padding="400">
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Avg Fit Score</Text>
                    <Text as="p" variant="heading2xl">{tryOnStats.avgFitScore}%</Text>
                    <Badge tone="info">Excellent</Badge>
                  </BlockStack>
                </Box>
              </Card>

              <Card>
                <Box padding="400">
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Active Products</Text>
                    <Text as="p" variant="heading2xl">{products.length}</Text>
                    <Badge tone="info">AI-Ready</Badge>
                  </BlockStack>
                </Box>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingLg">Recent Try-On Activity</Text>
                    <Button variant="secondary" url="/analytics">View All</Button>
                  </InlineStack>
                  
                  <DataTable
                    columnContentTypes={['text', 'text', 'text', 'text']}
                    headings={['Customer', 'Product', 'Fit Score', 'Action']}
                    rows={recentTryOns}
                  />
                </BlockStack>
              </Box>
            </Card>

            {/* Quick Actions */}
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text as="h2" variant="headingLg">Quick Actions</Text>
                  <ButtonGroup>
                    <Button variant="primary" url="/try-on">Launch Try-On Studio</Button>
                    <Button url="/products">Manage Products</Button>
                    <Button url="/customers">View Customers</Button>
                    <Button url="/settings">App Settings</Button>
                  </ButtonGroup>
                </BlockStack>
              </Box>
            </Card>
          </BlockStack>
        </Layout>
      </Layout>
    </Page>
  );
};