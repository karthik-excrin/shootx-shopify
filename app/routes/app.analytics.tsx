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
  ProgressBar,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    analytics: {
      totalTryOns: 2847,
      conversionRate: 12.4,
      averageFitScore: 87.3,
      topProducts: [
        { name: "Summer Dress", tryOns: 456, conversion: 15.2 },
        { name: "Classic Shirt", tryOns: 389, conversion: 13.8 },
        { name: "Denim Jeans", tryOns: 234, conversion: 11.5 },
      ],
      monthlyGrowth: 23.5,
    },
  });
};

export default function Analytics() {
  const { analytics } = useLoaderData<typeof loader>();

  return (
    <Page title="AI Try-On Analytics">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Key Metrics */}
            <InlineGrid columns={4} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Total Try-Ons
                  </Text>
                  <Text as="p" variant="headingXl">
                    {analytics.totalTryOns.toLocaleString()}
                  </Text>
                  <Badge tone="success">+{analytics.monthlyGrowth}%</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Conversion Rate
                  </Text>
                  <Text as="p" variant="headingXl">
                    {analytics.conversionRate}%
                  </Text>
                  <Badge tone="success">Above Average</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Avg Fit Score
                  </Text>
                  <Text as="p" variant="headingXl">
                    {analytics.averageFitScore}%
                  </Text>
                  <Badge tone="info">Excellent</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Monthly Growth
                  </Text>
                  <Text as="p" variant="headingXl">
                    +{analytics.monthlyGrowth}%
                  </Text>
                  <Badge tone="success">Trending Up</Badge>
                </BlockStack>
              </Card>
            </InlineGrid>

            {/* Top Performing Products */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Top Performing Products
                </Text>
                <BlockStack gap="300">
                  {analytics.topProducts.map((product, index) => (
                    <Card key={index}>
                      <BlockStack gap="300">
                        <InlineGrid columns={3} gap="200">
                          <Text as="h3" variant="headingMd">
                            {product.name}
                          </Text>
                          <Text as="p" variant="bodyMd">
                            {product.tryOns} try-ons
                          </Text>
                          <Badge tone="success">
                            {product.conversion}% conversion
                          </Badge>
                        </InlineGrid>
                        <ProgressBar 
                          progress={(product.conversion / 20) * 100} 
                          size="small"
                        />
                      </BlockStack>
                    </Card>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>

            {/* Performance Insights */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Performance Insights
                </Text>
                <BlockStack gap="300">
                  <Card>
                    <Text as="p" variant="bodyMd">
                      🎯 <strong>High Conversion:</strong> Products with AI try-on have 3x higher conversion rates
                    </Text>
                  </Card>
                  <Card>
                    <Text as="p" variant="bodyMd">
                      📈 <strong>Growing Engagement:</strong> Try-on usage increased by 23.5% this month
                    </Text>
                  </Card>
                  <Card>
                    <Text as="p" variant="bodyMd">
                      ⭐ <strong>Customer Satisfaction:</strong> 87.3% average fit score indicates high accuracy
                    </Text>
                  </Card>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}