import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  Badge,
  Button,
  Box,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  // Mock data for dashboard
  return json({
    stats: {
      totalProducts: 156,
      aiEnabledProducts: 89,
      totalTryOns: 2847,
      conversionRate: 12.4,
    },
    recentActivity: [
      { id: 1, action: "AI Try-On", product: "Summer Dress", time: "2 min ago" },
      { id: 2, action: "Product Added", product: "Casual Shirt", time: "5 min ago" },
      { id: 3, action: "AI Try-On", product: "Denim Jeans", time: "8 min ago" },
    ],
  });
};

export default function Index() {
  const { stats, recentActivity } = useLoaderData<typeof loader>();

  return (
    <Page title="AI Fashion Try-On Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Stats Cards */}
            <InlineGrid columns={4} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Total Products
                  </Text>
                  <Text as="p" variant="headingXl">
                    {stats.totalProducts}
                  </Text>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    AI-Enabled Products
                  </Text>
                  <Text as="p" variant="headingXl">
                    {stats.aiEnabledProducts}
                  </Text>
                  <Badge tone="success">Active</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Total Try-Ons
                  </Text>
                  <Text as="p" variant="headingXl">
                    {stats.totalTryOns.toLocaleString()}
                  </Text>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Conversion Rate
                  </Text>
                  <Text as="p" variant="headingXl">
                    {stats.conversionRate}%
                  </Text>
                  <Badge tone="success">+2.1%</Badge>
                </BlockStack>
              </Card>
            </InlineGrid>

            {/* Quick Actions */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Quick Actions
                </Text>
                <InlineGrid columns={3} gap="400">
                  <Button variant="primary" url="/app/products">
                    Manage Products
                  </Button>
                  <Button url="/app/try-on">
                    AI Try-On Studio
                  </Button>
                  <Button url="/app/analytics">
                    View Analytics
                  </Button>
                </InlineGrid>
              </BlockStack>
            </Card>

            {/* Recent Activity */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Recent Activity
                </Text>
                <BlockStack gap="300">
                  {recentActivity.map((activity) => (
                    <Box key={activity.id} padding="300" background="bg-surface-secondary">
                      <InlineGrid columns={3} gap="200">
                        <Text as="p" variant="bodyMd" fontWeight="medium">
                          {activity.action}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {activity.product}
                        </Text>
                        <Text as="p" variant="bodyMd" tone="subdued">
                          {activity.time}
                        </Text>
                      </InlineGrid>
                    </Box>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}