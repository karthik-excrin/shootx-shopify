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
} from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";

import { authenticate } from "./shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return json({
    polarisTranslations: require("@shopify/polaris/locales/en.json"),
    apiKey: process.env.SHOPIFY_API_KEY || "",
  });
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
            <a href="/app/additional">Additional page</a>
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
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};