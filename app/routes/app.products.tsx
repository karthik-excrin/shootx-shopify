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
  DataTable,
  Badge,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  // Fetch products from Shopify
  const response = await admin.graphql(
    `#graphql
      query getProducts($first: Int!) {
        products(first: $first) {
          nodes {
            id
            title
            handle
            status
            totalInventory
            createdAt
            images(first: 1) {
              nodes {
                url
                altText
              }
            }
            variants(first: 1) {
              nodes {
                price
              }
            }
          }
        }
      }`,
    {
      variables: {
        first: 10,
      },
    }
  );

  const responseJson = await response.json();
  const products = responseJson.data?.products?.nodes || [];

  return json({
    products,
  });
};

export default function Products() {
  const { products } = useLoaderData<typeof loader>();

  const rows = products.map((product: any) => [
    product.title,
    product.handle,
    product.variants.nodes[0]?.price || "N/A",
    product.totalInventory || 0,
    <Badge key={product.id} tone="success">
      AI Ready
    </Badge>,
    <Button key={`edit-${product.id}`} size="slim">
      Configure AI
    </Button>,
  ]);

  return (
    <Page>
      <TitleBar title="Product Management" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  AI Try-On Product Configuration
                </Text>
                <Text variant="bodyMd" as="p">
                  Configure your products for AI virtual try-on functionality.
                  Products need proper images and metadata for optimal AI processing.
                </Text>
              </BlockStack>
              
              {products.length > 0 ? (
                <DataTable
                  columnContentTypes={['text', 'text', 'text', 'numeric', 'text', 'text']}
                  headings={['Product', 'Handle', 'Price', 'Inventory', 'AI Status', 'Actions']}
                  rows={rows}
                />
              ) : (
                <Box padding="400">
                  <BlockStack gap="200" align="center">
                    <Text as="p" variant="bodyMd">
                      No products found. Create some products in your Shopify admin first.
                    </Text>
                    <Button
                      url={`https://${process.env.SHOP_DOMAIN || 'your-shop'}.myshopify.com/admin/products`}
                      target="_blank"
                    >
                      Go to Products
                    </Button>
                  </BlockStack>
                </Box>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}