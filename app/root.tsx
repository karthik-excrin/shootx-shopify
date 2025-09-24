import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // For development, return mock data
  if (process.env.NODE_ENV === "development") {
    return json({
      polarisTranslations: {},
      apiKey: process.env.SHOPIFY_API_KEY || "development-key",
    });
  }

  // In production, use proper authentication
  try {
    const { authenticate } = await import("./shopify.server");
    await authenticate.admin(request);

    return json({
      polarisTranslations: require("@shopify/polaris/locales/en.json"),
      apiKey: process.env.SHOPIFY_API_KEY || "",
    });
  } catch (error) {
    // Fallback for development
    return json({
      polarisTranslations: {},
      apiKey: process.env.SHOPIFY_API_KEY || "development-key",
    });
  }
};

export default function App() {
  const { polarisTranslations, apiKey } = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider
          isEmbeddedApp
          apiKey={apiKey}
          i18n={polarisTranslations}
        >
          <NavMenu>
            <a href="/" rel="home">
              Home
            </a>
            <a href="/app/products">Products</a>
            <a href="/app/try-on">Try-On Studio</a>
          </NavMenu>
          <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: "20px" }}>
          <h1>Something went wrong</h1>
          <p>We're sorry, but something went wrong. Please try again later.</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error instanceof Error ? error.stack : "Unknown error"}
          </details>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export const headers: HeadersFunction = () => {
  return {
    "X-Shopify-API-Request-Failure-Reauthorize": "1",
    "X-Shopify-API-Request-Failure-Reauthorize-Url": "/api/auth",
  };
};