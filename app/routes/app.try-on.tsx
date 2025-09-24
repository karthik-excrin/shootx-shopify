import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useState, useCallback, useRef } from "react";
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
  DropZone,
  Thumbnail,
  Select,
  Spinner,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  // Fetch products for try-on selection
  const response = await admin.graphql(
    `#graphql
      query getProducts($first: Int!) {
        products(first: $first) {
          nodes {
            id
            title
            handle
            images(first: 1) {
              nodes {
                url
                altText
              }
            }
            variants(first: 5) {
              nodes {
                id
                title
                image {
                  url
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        first: 20,
      },
    }
  );

  const responseJson = await response.json();
  const products = responseJson.data?.products?.nodes || [];

  return json({
    shop: session.shop,
    products,
  });
};

export default function TryOnStudio() {
  const { shop, products } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  
  // Component state
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImagePreview, setModelImagePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobId, setJobId] = useState<string>('');
  const [tryOnResult, setTryOnResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get selected product data
  const selectedProductData = products.find((p: any) => p.id === selectedProduct);
  const variantOptions = selectedProductData?.variants.nodes.map((variant: any) => ({
    label: variant.title,
    value: variant.id,
  })) || [];

  // Product selection options
  const productOptions = [
    { label: 'Select a product...', value: '' },
    ...products.map((product: any) => ({
      label: product.title,
      value: product.id,
    })),
  ];

  // Handle model image upload
  const handleModelImageDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      setModelImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Submit try-on request
  const handleTryOnSubmit = async () => {
    if (!modelImage || !selectedProduct || !selectedVariant) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Convert image to base64
      const base64Image = await fileToBase64(modelImage);
      
      // Extract product and variant IDs (remove GraphQL prefixes)
      const productId = selectedProduct.replace('gid://shopify/Product/', '');
      const variantId = selectedVariant.replace('gid://shopify/ProductVariant/', '');
      
      // Submit to API
      const formData = new FormData();
      formData.append('modelImage', base64Image);
      formData.append('productId', productId);
      formData.append('variantId', variantId);
      formData.append('customerId', 'demo-customer'); // TODO: Get actual customer ID
      
      fetcher.submit(formData, {
        method: 'POST',
        action: '/api/tryon',
      });
      
    } catch (error) {
      console.error('Try-on submission failed:', error);
      setIsProcessing(false);
    }
  };

  // Handle fetcher response
  if (fetcher.data && fetcher.state === 'idle') {
    if (fetcher.data.success && jobId !== fetcher.data.jobId) {
      setJobId(fetcher.data.jobId);
      // TODO: Start polling for results after deployment
    }
    if (isProcessing) {
      setIsProcessing(false);
    }
  }

  return (
    <Page>
      <TitleBar title="AI Try-On Studio" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  🎯 AI Virtual Try-On Studio
                </Text>
                <Text variant="bodyMd" as="p">
                  Upload a model image and select a product to see how it looks with our 
                  ComfyUI-powered AI try-on technology running on RunPod.
                </Text>
              </BlockStack>
              
              <InlineStack gap="300">
                <Badge tone="info">
                  🤖 ComfyUI Workflow
                </Badge>
                <Badge tone="success">
                  ⚡ RunPod Processing
                </Badge>
                <Badge tone="attention">
                  🎨 High Quality Results
                </Badge>
              </InlineStack>

              {/* Product Selection */}
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  1. Select Product & Variant
                </Text>
                <Select
                  label="Choose Product"
                  options={productOptions}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                />
                {variantOptions.length > 0 && (
                  <Select
                    label="Choose Variant"
                    options={[
                      { label: 'Select variant...', value: '' },
                      ...variantOptions,
                    ]}
                    value={selectedVariant}
                    onChange={setSelectedVariant}
                  />
                )}
              </BlockStack>

              {/* Model Image Upload */}
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  2. Upload Model Image
                </Text>
                <DropZone onDrop={handleModelImageDrop} accept="image/*">
                  {modelImagePreview ? (
                    <Box padding="400">
                      <BlockStack gap="200" align="center">
                        <Thumbnail
                          source={modelImagePreview}
                          alt="Model preview"
                          size="large"
                        />
                        <Text variant="bodyMd">
                          Model image uploaded successfully
                        </Text>
                        <Button onClick={() => {
                          setModelImage(null);
                          setModelImagePreview('');
                        }}>
                          Remove Image
                        </Button>
                      </BlockStack>
                    </Box>
                  ) : (
                    <DropZone.FileUpload />
                  )}
                </DropZone>
                <Text variant="bodyMd" tone="subdued">
                  Upload a clear photo of a person for best try-on results. 
                  Recommended: front-facing pose, good lighting, minimal background.
                </Text>
              </BlockStack>

              {/* Try-On Action */}
              <BlockStack gap="300">
                <Text as="h3" variant="headingMd">
                  3. Generate Try-On
                </Text>
                <InlineStack gap="200">
                  <Button
                    variant="primary"
                    onClick={handleTryOnSubmit}
                    disabled={!modelImage || !selectedProduct || !selectedVariant || isProcessing}
                    loading={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Generate Try-On'}
                  </Button>
                  {jobId && (
                    <Text variant="bodyMd" tone="subdued">
                      Job ID: {jobId}
                    </Text>
                  )}
                </InlineStack>
              </BlockStack>

              {/* Status Messages */}
              {fetcher.data?.error && (
                <Banner tone="critical">
                  <Text variant="bodyMd">
                    Error: {fetcher.data.error}
                  </Text>
                </Banner>
              )}

              {jobId && (
                <Banner tone="info">
                  <BlockStack gap="200">
                    <Text variant="bodyMd">
                      🚀 Try-on job submitted successfully! 
                    </Text>
                    <Text variant="bodyMd" tone="subdued">
                      The ComfyUI workflow is processing your request on RunPod. 
                      Results will appear here when ready.
                    </Text>
                    {/* TODO: Add result polling and display after deployment */}
                  </BlockStack>
                </Banner>
              )}

            </BlockStack>
          </Card>
        </Layout.Section>
        
        {/* Technical Info Sidebar */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text as="h3" variant="headingMd">
                🔧 Technical Setup
              </Text>
              <BlockStack gap="200">
                <Text variant="bodyMd">
                  <strong>AI Engine:</strong> ComfyUI Workflow
                </Text>
                <Text variant="bodyMd">
                  <strong>Processing:</strong> RunPod GPU Instances
                </Text>
                <Text variant="bodyMd">
                  <strong>Workflow:</strong> Automatic dress fetching from product page
                </Text>
                <Text variant="bodyMd">
                  <strong>Input:</strong> User model image only
                </Text>
              </BlockStack>
              
              <Text as="h4" variant="headingSm">
                📋 Setup Checklist (Post-Deployment)
              </Text>
              <Box>
                <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
                  <li>Configure RunPod API endpoint</li>
                  <li>Set ComfyUI workflow ID</li>
                  <li>Add API keys to environment</li>
                  <li>Test image processing pipeline</li>
                  <li>Enable result polling system</li>
                </ul>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}