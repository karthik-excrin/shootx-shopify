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
  Thumbnail,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  // Mock product data
  return json({
    products: [
      {
        id: "1",
        title: "Elegant Summer Dress",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$89.99",
        aiEnabled: true,
        tryOnCount: 234,
      },
      {
        id: "2",
        title: "Classic White Shirt",
        image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$65.00",
        aiEnabled: true,
        tryOnCount: 156,
      },
      {
        id: "3",
        title: "High-Waisted Jeans",
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$95.00",
        aiEnabled: false,
        tryOnCount: 0,
      },
      {
        id: "4",
        title: "Cozy Knit Sweater",
        image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$78.00",
        aiEnabled: true,
        tryOnCount: 89,
      },
    ],
  });
};

export default function Products() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Product Management"
      primaryAction={{
        content: "Add Product",
        onAction: () => console.log("Add product"),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingLg">
                AI Try-On Enabled Products
              </Text>
              <BlockStack gap="300">
                {products.map((product) => (
                  <Card key={product.id}>
                    <InlineStack gap="400" align="space-between">
                      <InlineStack gap="400">
                        <Thumbnail
                          source={product.image}
                          alt={product.title}
                          size="medium"
                        />
                        <BlockStack gap="100">
                          <Text as="h3" variant="headingMd">
                            {product.title}
                          </Text>
                          <Text as="p" variant="bodyMd" tone="subdued">
                            {product.price}
                          </Text>
                          <InlineStack gap="200">
                            <Badge tone={product.aiEnabled ? "success" : "warning"}>
                              {product.aiEnabled ? "AI Enabled" : "AI Disabled"}
                            </Badge>
                            {product.tryOnCount > 0 && (
                              <Badge tone="info">
                                {product.tryOnCount} Try-Ons
                              </Badge>
                            )}
                          </InlineStack>
                        </BlockStack>
                      </InlineStack>
                      <InlineStack gap="200">
                        <Button
                          variant={product.aiEnabled ? "secondary" : "primary"}
                          onClick={() => console.log("Toggle AI for", product.id)}
                        >
                          {product.aiEnabled ? "Disable AI" : "Enable AI"}
                        </Button>
                        <Button onClick={() => console.log("Edit", product.id)}>
                          Edit
                        </Button>
                      </InlineStack>
                    </InlineStack>
                  </Card>
                ))}
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}