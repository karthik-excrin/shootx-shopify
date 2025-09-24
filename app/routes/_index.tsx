import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  InlineStack,
  Badge,
  Box,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
  // Skip authentication in development
  if (process.env.NODE_ENV !== "production") {
    return json({
      shop: "development-shop",
      products: [],
    });
  }
  
  // In production, use proper authentication
  // const { admin } = await authenticate.admin(request);
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  return json({
    shop: "development-shop", 
    products: [],
  });
};

export default function Index() {
}