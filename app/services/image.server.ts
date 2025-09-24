/**
 * Image Processing Service
 * 
 * Handles image operations for the AI try-on workflow:
 * - Fetching product images from Shopify
 * - Processing user uploaded model images
 * - Image format conversion and validation
 * - Base64 encoding for ComfyUI workflow
 */

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export class ImageService {
  /**
   * Fetch product image from Shopify and convert to base64
   * This automatically gets the dress image from the product page
   * 
   * @param imageUrl - Shopify product image URL
   * @param options - Image processing options
   * @returns Promise with base64 encoded image
   */
  async fetchProductImageAsBase64(
    imageUrl: string, 
    options: ImageProcessingOptions = {}
  ): Promise<string> {
    try {
      // Fetch the image from Shopify CDN
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product image: ${response.status}`);
      }

      const imageBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      
      // TODO: Add image processing/resizing after deployment if needed
      // For now, return the raw base64 image
      return base64Image;

    } catch (error) {
      console.error('Product image fetch failed:', error);
      throw new Error('Failed to process product image');
    }
  }

  /**
   * Process user uploaded model image
   * Validates and converts the uploaded image to the format needed by ComfyUI
   * 
   * @param imageData - Base64 or buffer data from user upload
   * @param options - Processing options
   * @returns Promise with processed base64 image
   */
  async processModelImage(
    imageData: string | Buffer, 
    options: ImageProcessingOptions = {}
  ): Promise<string> {
    try {
      let base64Image: string;

      if (typeof imageData === 'string') {
        // Remove data URL prefix if present
        base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      } else {
        base64Image = imageData.toString('base64');
      }

      // TODO: Add image validation and processing after deployment
      // - Check image dimensions
      // - Resize if needed
      // - Validate file format
      // - Apply any preprocessing for ComfyUI workflow

      return base64Image;

    } catch (error) {
      console.error('Model image processing failed:', error);
      throw new Error('Failed to process model image');
    }
  }

  /**
   * Validate image format and size
   * 
   * @param base64Image - Base64 encoded image
   * @returns Validation result with image info
   */
  validateImage(base64Image: string): {
    valid: boolean;
    format?: string;
    size?: number;
    error?: string;
  } {
    try {
      // Basic validation - check if it's valid base64
      const buffer = Buffer.from(base64Image, 'base64');
      
      // TODO: Add more sophisticated validation after deployment
      // - Check image headers for format
      // - Validate dimensions
      // - Check file size limits
      
      return {
        valid: true,
        size: buffer.length,
      };

    } catch (error) {
      return {
        valid: false,
        error: 'Invalid image format',
      };
    }
  }

  /**
   * Get optimized image URL from Shopify
   * Shopify provides image transformation parameters
   * 
   * @param originalUrl - Original Shopify image URL
   * @param width - Desired width
   * @param height - Desired height
   * @returns Optimized image URL
   */
  getOptimizedShopifyImageUrl(
    originalUrl: string, 
    width: number = 1024, 
    height: number = 1024
  ): string {
    // Shopify image transformation format
    // TODO: Adjust dimensions based on ComfyUI workflow requirements after deployment
    const transformedUrl = originalUrl.replace(
      /\.(jpg|jpeg|png|webp)/i, 
      `_${width}x${height}.$1`
    );
    
    return transformedUrl;
  }
}

// Singleton instance
export const imageService = new ImageService();