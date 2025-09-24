/**
 * AI Try-On API Route
 * 
 * Handles the complete try-on workflow:
 * 1. Receives user model image upload
 * 2. Fetches product dress image from Shopify
 * 3. Submits both to ComfyUI workflow on RunPod
 * 4. Returns job ID for status tracking
 */

import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { comfyUIService } from "../services/comfyui.server";
import { imageService } from "../services/image.server";
import { database } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Authenticate the request
  const { admin, session } = await authenticate.admin(request);

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const modelImage = formData.get("modelImage") as string;
    const productId = formData.get("productId") as string;
    const variantId = formData.get("variantId") as string;
    const customerId = formData.get("customerId") as string;

    // Validate required fields
    if (!modelImage || !productId || !variantId) {
      return json({ 
        error: "Missing required fields: modelImage, productId, variantId" 
      }, { status: 400 });
    }

    // Fetch product information from Shopify
    const productResponse = await admin.graphql(
      `#graphql
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            images(first: 1) {
              nodes {
                url
                altText
              }
            }
            variants(first: 10) {
              nodes {
                id
                title
                image {
                  url
                }
              }
            }
          }
        }`,
      {
        variables: {
          id: `gid://shopify/Product/${productId}`,
        },
      }
    );

    const productData = await productResponse.json();
    const product = productData.data?.product;

    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    // Get the specific variant or use the first available image
    let garmentImageUrl = product.images.nodes[0]?.url;
    
    // Try to get variant-specific image
    const variant = product.variants.nodes.find((v: any) => 
      v.id === `gid://shopify/ProductVariant/${variantId}`
    );
    
    if (variant?.image?.url) {
      garmentImageUrl = variant.image.url;
    }

    if (!garmentImageUrl) {
      return json({ error: "No product image found" }, { status: 400 });
    }

    // Process images for ComfyUI workflow
    const processedModelImage = await imageService.processModelImage(modelImage);
    const garmentImageBase64 = await imageService.fetchProductImageAsBase64(
      imageService.getOptimizedShopifyImageUrl(garmentImageUrl, 1024, 1024)
    );

    // Submit to ComfyUI workflow on RunPod
    const workflowResult = await comfyUIService.submitTryOnJob({
      modelImage: processedModelImage,
      garmentImage: garmentImageBase64,
      productId,
      variantId,
    });

    if (!workflowResult.success) {
      return json({ 
        error: "Failed to submit try-on job", 
        details: workflowResult.error 
      }, { status: 500 });
    }

    // Store the try-on request in database for tracking
    const tryOnId = database.createTryOnResult({
      customerId,
      productId,
      variantId,
      userPhoto: modelImage, // Store original upload
      resultImage: '', // Will be updated when job completes
      fitScore: 0, // Will be calculated after processing
      pose: 'front', // Default pose
    });

    return json({
      success: true,
      jobId: workflowResult.jobId,
      tryOnId,
      status: workflowResult.status,
      message: "Try-on job submitted successfully",
    });

  } catch (error) {
    console.error("Try-on API error:", error);
    return json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
};

/**
 * Get try-on job status
 * Used for polling the ComfyUI workflow progress
 */
export const loader = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  
  const url = new URL(request.url);
  const jobId = url.searchParams.get("jobId");
  const tryOnId = url.searchParams.get("tryOnId");

  if (!jobId) {
    return json({ error: "Job ID required" }, { status: 400 });
  }

  try {
    // Check job status from ComfyUI/RunPod
    const statusResult = await comfyUIService.checkJobStatus(jobId);

    // If job is completed, update database with result
    if (statusResult.status === 'completed' && statusResult.resultImage && tryOnId) {
      // TODO: Update database with result image after deployment
      // database.updateTryOnResult(tryOnId, {
      //   resultImage: statusResult.resultImage,
      //   fitScore: calculateFitScore(statusResult.resultImage), // Implement scoring
      // });
    }

    return json({
      success: statusResult.success,
      status: statusResult.status,
      resultImage: statusResult.resultImage,
      processingTime: statusResult.processingTime,
      error: statusResult.error,
    });

  } catch (error) {
    console.error("Status check error:", error);
    return json({ 
      error: "Failed to check job status" 
    }, { status: 500 });
  }
};