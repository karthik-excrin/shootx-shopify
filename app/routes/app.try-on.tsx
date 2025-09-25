import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import {
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  Button,
  DropZone,
  Thumbnail,
  InlineStack,
  ProgressBar,
  Badge,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    products: [
      {
        id: "1",
        title: "Elegant Summer Dress",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$89.99",
      },
      {
        id: "2",
        title: "Classic White Shirt",
        image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=200",
        price: "$65.00",
      },
    ],
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticate.admin(request);
  
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return json({
    success: true,
    result: {
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
      fitScore: 92,
      recommendations: [
        "Perfect fit for your body type",
        "Great color choice for your skin tone",
        "Consider sizing up for a looser fit",
      ],
    },
  });
};

export default function TryOn() {
  const { products } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      setFiles(acceptedFiles);
    },
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const fileUpload = !files.length && (
    <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
  );

  const uploadedFiles = files.length > 0 && (
    <BlockStack gap="300">
      {files.map((file, index) => (
        <InlineStack key={index} gap="200">
          <Thumbnail
            size="small"
            alt={file.name}
            source={URL.createObjectURL(file)}
          />
          <div>
            {file.name}{" "}
            <Text as="p" variant="bodySm" tone="subdued">
              {file.size} bytes
            </Text>
          </div>
        </InlineStack>
      ))}
    </BlockStack>
  );

  return (
    <Page title="AI Try-On Studio">
      <Layout>
        <Layout.Section>
          <InlineGrid columns={2} gap="400">
            {/* Upload Section */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Upload Your Photo
                </Text>
                <DropZone
                  accept="image/*"
                  type="image"
                  onDrop={handleDropZoneDrop}
                  variableHeight
                >
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Upload a clear, full-body photo for best results
                </Text>
              </BlockStack>
            </Card>

            {/* Product Selection */}
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Select Product
                </Text>
                <BlockStack gap="300">
                  {products.map((product) => (
                    <Card key={product.id}>
                      <InlineStack gap="300" align="space-between">
                        <InlineStack gap="300">
                          <Thumbnail
                            source={product.image}
                            alt={product.title}
                            size="small"
                          />
                          <BlockStack gap="100">
                            <Text as="h3" variant="headingMd">
                              {product.title}
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              {product.price}
                            </Text>
                          </BlockStack>
                        </InlineStack>
                        <Button
                          variant={selectedProduct === product.id ? "primary" : "secondary"}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          {selectedProduct === product.id ? "Selected" : "Select"}
                        </Button>
                      </InlineStack>
                    </Card>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </InlineGrid>
        </Layout.Section>

        {/* Try-On Button */}
        {files.length > 0 && selectedProduct && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Generate AI Try-On
                </Text>
                {isProcessing && (
                  <BlockStack gap="200">
                    <ProgressBar progress={75} />
                    <Text as="p" variant="bodyMd" tone="subdued">
                      Processing your AI try-on...
                    </Text>
                  </BlockStack>
                )}
                <Form method="post">
                  <Button
                    variant="primary"
                    size="large"
                    submit
                    loading={isProcessing}
                    onClick={() => setIsProcessing(true)}
                  >
                    Generate AI Try-On
                  </Button>
                </Form>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}

        {/* Results */}
        {actionData?.success && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Your AI Try-On Result
                </Text>
                <InlineGrid columns={2} gap="400">
                  <div>
                    <img
                      src={actionData.result.image}
                      alt="AI Try-On Result"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </div>
                  <BlockStack gap="300">
                    <InlineStack gap="200">
                      <Text as="h3" variant="headingMd">
                        Fit Score:
                      </Text>
                      <Badge tone="success">
                        {actionData.result.fitScore}%
                      </Badge>
                    </InlineStack>
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingMd">
                        AI Recommendations:
                      </Text>
                      {actionData.result.recommendations.map((rec, index) => (
                        <Text key={index} as="p" variant="bodyMd">
                          • {rec}
                        </Text>
                      ))}
                    </BlockStack>
                    <Button variant="primary">
                      Add to Cart
                    </Button>
                  </BlockStack>
                </InlineGrid>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
}