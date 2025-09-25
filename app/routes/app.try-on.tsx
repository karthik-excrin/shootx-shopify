import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
  Badge,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Always return mock data for development
  return json({
    shop: "development-shop.myshopify.com",
  });
};

export default function TryOnStudio() {
  const { shop } = useLoaderData<typeof loader>();

  return (
    <Page>
      <TitleBar title="AI Try-On Studio" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  AI Virtual Try-On Studio
                </Text>
                <Text variant="bodyMd" as="p">
                  Experience the power of AI-driven virtual try-on technology.
                  Upload customer photos and see how your products look on them.
                </Text>
              </BlockStack>
              
              <InlineStack gap="300">
                <Badge tone="info">
                  ✨ AI Powered
                </Badge>
                <Badge tone="success">
                  Real-time Processing
                </Badge>
                <Badge tone="attention">
                  High Accuracy
                </Badge>
              </InlineStack>

              <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="300" align="center">
                  <Text as="h3" variant="headingMd">
                    🚀 Coming Soon
                  </Text>
                  <Text variant="bodyMd" as="p" alignment="center">
                    The AI Try-On Studio is currently in development. 
                    This feature will allow customers to upload their photos 
                    and see realistic try-on results using advanced AI technology.
                  </Text>
                  <InlineStack gap="200">
                    <Button variant="primary">
                      Request Early Access
                    </Button>
                    <Button>
                      Learn More
                    </Button>
                  </InlineStack>
                </BlockStack>
              </Box>

              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  Features
                </Text>
                <Box>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>Real-time AI processing</li>
                    <li>Multiple pose angles</li>
                    <li>Fit score analysis</li>
                    <li>Style recommendations</li>
                    <li>Social sharing capabilities</li>
                    <li>Mobile-optimized experience</li>
                  </ul>
                </Box>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}