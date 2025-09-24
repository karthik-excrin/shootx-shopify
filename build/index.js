var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

// app/shopify.server.ts
import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION
} from "@shopify/shopify-app-remix/server";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";

// app/db.server.ts
import Database from "better-sqlite3";
import { join } from "path";
var db;
function getDatabase() {
  if (!db) {
    let dbPath = join(process.cwd(), "app.db");
    db = new Database(dbPath), db.pragma("journal_mode = WAL"), createTables();
  }
  return db;
}
function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      shop TEXT NOT NULL,
      state TEXT NOT NULL,
      isOnline INTEGER DEFAULT 0,
      scope TEXT,
      expires INTEGER,
      accessToken TEXT NOT NULL,
      userId INTEGER,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      accountOwner INTEGER DEFAULT 0,
      locale TEXT,
      collaborator INTEGER DEFAULT 0,
      emailVerified INTEGER DEFAULT 0
    )
  `), db.exec(`
    CREATE TABLE IF NOT EXISTS tryOnResults (
      id TEXT PRIMARY KEY,
      customerId TEXT,
      productId TEXT NOT NULL,
      variantId TEXT NOT NULL,
      userPhoto TEXT NOT NULL,
      resultImage TEXT DEFAULT '',
      fitScore INTEGER DEFAULT 0,
      pose TEXT NOT NULL,
      jobId TEXT,
      status TEXT DEFAULT 'pending',
      processingTime INTEGER DEFAULT 0,
      createdAt INTEGER DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `), db.exec(`
    CREATE TABLE IF NOT EXISTS productAIConfigs (
      id TEXT PRIMARY KEY,
      productId TEXT UNIQUE NOT NULL,
      aiOptimized INTEGER DEFAULT 0,
      category TEXT,
      tags TEXT,
      createdAt INTEGER DEFAULT (strftime('%s', 'now')),
      updatedAt INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `);
}
var SQLiteSessionStorage = class {
  db;
  constructor() {
    this.db = getDatabase();
  }
  async storeSession(session) {
    return this.db.prepare(`
      INSERT OR REPLACE INTO sessions 
      (id, shop, state, isOnline, scope, expires, accessToken, userId, firstName, lastName, email, accountOwner, locale, collaborator, emailVerified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      session.id,
      session.shop,
      session.state,
      session.isOnline ? 1 : 0,
      session.scope,
      session.expires ? Math.floor(session.expires.getTime() / 1e3) : null,
      session.accessToken,
      session.userId,
      session.firstName,
      session.lastName,
      session.email,
      session.accountOwner ? 1 : 0,
      session.locale,
      session.collaborator ? 1 : 0,
      session.emailVerified ? 1 : 0
    ), !0;
  }
  async loadSession(id) {
    let row = this.db.prepare("SELECT * FROM sessions WHERE id = ?").get(id);
    if (row)
      return {
        id: row.id,
        shop: row.shop,
        state: row.state,
        isOnline: Boolean(row.isOnline),
        scope: row.scope,
        expires: row.expires ? new Date(row.expires * 1e3) : void 0,
        accessToken: row.accessToken,
        userId: row.userId,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        accountOwner: Boolean(row.accountOwner),
        locale: row.locale,
        collaborator: Boolean(row.collaborator),
        emailVerified: Boolean(row.emailVerified)
      };
  }
  async deleteSession(id) {
    return this.db.prepare("DELETE FROM sessions WHERE id = ?").run(id), !0;
  }
  async deleteSessions(ids) {
    let stmt = this.db.prepare("DELETE FROM sessions WHERE id = ?");
    return this.db.transaction((ids2) => {
      for (let id of ids2)
        stmt.run(id);
    })(ids), !0;
  }
  async findSessionsByShop(shop) {
    return this.db.prepare("SELECT * FROM sessions WHERE shop = ?").all(shop).map((row) => ({
      id: row.id,
      shop: row.shop,
      state: row.state,
      isOnline: Boolean(row.isOnline),
      scope: row.scope,
      expires: row.expires ? new Date(row.expires * 1e3) : void 0,
      accessToken: row.accessToken,
      userId: row.userId,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      accountOwner: Boolean(row.accountOwner),
      locale: row.locale,
      collaborator: Boolean(row.collaborator),
      emailVerified: Boolean(row.emailVerified)
    }));
  }
}, database = {
  // Try-on results
  createTryOnResult: (data) => {
    let db2 = getDatabase(), id = `tryon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return db2.prepare(`
      INSERT INTO tryOnResults (id, customerId, productId, variantId, userPhoto, resultImage, fitScore, pose, jobId, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.customerId,
      data.productId,
      data.variantId,
      data.userPhoto,
      data.resultImage || "",
      data.fitScore || 0,
      data.pose,
      data.jobId || "",
      data.status || "pending"
    ), id;
  },
  updateTryOnResult: (id, data) => (getDatabase().prepare(`
      UPDATE tryOnResults 
      SET resultImage = COALESCE(?, resultImage),
          fitScore = COALESCE(?, fitScore),
          status = COALESCE(?, status),
          processingTime = COALESCE(?, processingTime),
          updatedAt = strftime('%s', 'now')
      WHERE id = ?
    `).run(data.resultImage, data.fitScore, data.status, data.processingTime, id), id),
  getTryOnResults: (customerId) => {
    let db2 = getDatabase(), stmt = customerId ? db2.prepare("SELECT * FROM tryOnResults WHERE customerId = ? ORDER BY createdAt DESC") : db2.prepare("SELECT * FROM tryOnResults ORDER BY createdAt DESC");
    return customerId ? stmt.all(customerId) : stmt.all();
  },
  // Product AI configs
  createOrUpdateProductAIConfig: (data) => {
    let db2 = getDatabase(), id = `config_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return db2.prepare(`
      INSERT OR REPLACE INTO productAIConfigs (id, productId, aiOptimized, category, tags, updatedAt)
      VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'))
    `).run(id, data.productId, data.aiOptimized ? 1 : 0, data.category, data.tags), id;
  },
  getProductAIConfig: (productId) => {
    let row = getDatabase().prepare("SELECT * FROM productAIConfigs WHERE productId = ?").get(productId);
    return row ? {
      ...row,
      aiOptimized: Boolean(row.aiOptimized)
    } : null;
  }
}, db_server_default = getDatabase();

// app/shopify.server.ts
var isDevelopment = !0, shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || (isDevelopment ? "http://localhost:3000" : ""),
  authPathPrefix: "/auth",
  sessionStorage: new SQLiteSessionStorage(),
  distribution: AppDistribution.AppStore,
  restResources,
  // Skip authentication in development
  ...isDevelopment && {
    isEmbeddedApp: !1
  },
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    }
  },
  future: {
    v3_webhookAdminContext: !0,
    v3_authenticatePublic: !0
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, login = shopify.login, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;

// app/entry.server.tsx
import { jsxDEV } from "react/jsx-dev-runtime";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let markup = renderToString(
    /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 14,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  loader: () => loader
});
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var loader = async ({ request }) => json({
  message: "ShootX AI Fashion Try-On App"
});
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("title", { children: "Error" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2("div", { style: { padding: "2rem", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxDEV2("h1", { children: "Something went wrong" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2("p", { children: "Please try refreshing the page." }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}

// app/routes/app.products.tsx
var app_products_exports = {};
__export(app_products_exports, {
  default: () => Products,
  loader: () => loader2
});
import { json as json2 } from "@remix-run/node";
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
  Badge
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var loader2 = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request), products = (await (await admin.graphql(
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
        first: 10
      }
    }
  )).json()).data?.products?.nodes || [];
  return json2({
    products
  });
};
function Products() {
  let { products } = useLoaderData(), rows = products.map((product) => [
    product.title,
    product.handle,
    product.variants.nodes[0]?.price || "N/A",
    product.totalInventory || 0,
    /* @__PURE__ */ jsxDEV3(Badge, { tone: "success", children: "AI Ready" }, product.id, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 70,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV3(Button, { size: "slim", children: "Configure AI" }, `edit-${product.id}`, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 73,
      columnNumber: 5
    }, this)
  ]);
  return /* @__PURE__ */ jsxDEV3(Page, { children: [
    /* @__PURE__ */ jsxDEV3(TitleBar, { title: "Product Management" }, void 0, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 80,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3(Layout, { children: /* @__PURE__ */ jsxDEV3(Layout.Section, { children: /* @__PURE__ */ jsxDEV3(Card, { children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "500", children: [
      /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ jsxDEV3(Text, { as: "h2", variant: "headingMd", children: "AI Try-On Product Configuration" }, void 0, !1, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV3(Text, { variant: "bodyMd", as: "p", children: "Configure your products for AI virtual try-on functionality. Products need proper images and metadata for optimal AI processing." }, void 0, !1, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 89,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 85,
        columnNumber: 15
      }, this),
      products.length > 0 ? /* @__PURE__ */ jsxDEV3(
        DataTable,
        {
          columnContentTypes: ["text", "text", "text", "numeric", "text", "text"],
          headings: ["Product", "Handle", "Price", "Inventory", "AI Status", "Actions"],
          rows
        },
        void 0,
        !1,
        {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 96,
          columnNumber: 17
        },
        this
      ) : /* @__PURE__ */ jsxDEV3(Box, { padding: "400", children: /* @__PURE__ */ jsxDEV3(BlockStack, { gap: "200", align: "center", children: [
        /* @__PURE__ */ jsxDEV3(Text, { as: "p", variant: "bodyMd", children: "No products found. Create some products in your Shopify admin first." }, void 0, !1, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 104,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV3(
          Button,
          {
            url: `https://${process.env.SHOP_DOMAIN || "your-shop"}.myshopify.com/admin/products`,
            target: "_blank",
            children: "Go to Products"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/app.products.tsx",
            lineNumber: 107,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 103,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 102,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 84,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 83,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.products.tsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}

// app/routes/app.try-on.tsx
var app_try_on_exports = {};
__export(app_try_on_exports, {
  default: () => TryOnStudio,
  loader: () => loader3
});
import { json as json3 } from "@remix-run/node";
import { useLoaderData as useLoaderData2, useFetcher } from "@remix-run/react";
import { useState, useCallback, useRef } from "react";
import {
  Page as Page2,
  Layout as Layout2,
  Text as Text2,
  Card as Card2,
  Button as Button2,
  BlockStack as BlockStack2,
  Box as Box2,
  InlineStack,
  Badge as Badge2,
  DropZone,
  Thumbnail,
  Select,
  Banner
} from "@shopify/polaris";
import { TitleBar as TitleBar2 } from "@shopify/app-bridge-react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var loader3 = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request), products = (await (await admin.graphql(
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
        first: 20
      }
    }
  )).json()).data?.products?.nodes || [];
  return json3({
    shop: session.shop,
    products
  });
};
function TryOnStudio() {
  let { shop, products } = useLoaderData2(), fetcher = useFetcher(), [selectedProduct, setSelectedProduct] = useState(""), [selectedVariant, setSelectedVariant] = useState(""), [modelImage, setModelImage] = useState(null), [modelImagePreview, setModelImagePreview] = useState(""), [isProcessing, setIsProcessing] = useState(!1), [jobId, setJobId] = useState(""), [tryOnResult, setTryOnResult] = useState(""), fileInputRef = useRef(null), variantOptions = products.find((p) => p.id === selectedProduct)?.variants.nodes.map((variant) => ({
    label: variant.title,
    value: variant.id
  })) || [], productOptions = [
    { label: "Select a product...", value: "" },
    ...products.map((product) => ({
      label: product.title,
      value: product.id
    }))
  ], handleModelImageDrop = useCallback((files) => {
    let file = files[0];
    if (file && file.type.startsWith("image/")) {
      setModelImage(file);
      let reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result);
      }, reader.readAsDataURL(file);
    }
  }, []), fileToBase64 = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file), reader.onload = () => resolve(reader.result), reader.onerror = (error) => reject(error);
  }), handleTryOnSubmit = async () => {
    if (!(!modelImage || !selectedProduct || !selectedVariant)) {
      setIsProcessing(!0);
      try {
        let base64Image = await fileToBase64(modelImage), productId = selectedProduct.replace("gid://shopify/Product/", ""), variantId = selectedVariant.replace("gid://shopify/ProductVariant/", ""), formData = new FormData();
        formData.append("modelImage", base64Image), formData.append("productId", productId), formData.append("variantId", variantId), formData.append("customerId", "demo-customer"), fetcher.submit(formData, {
          method: "POST",
          action: "/api/tryon"
        });
      } catch (error) {
        console.error("Try-on submission failed:", error), setIsProcessing(!1);
      }
    }
  };
  return fetcher.data && fetcher.state === "idle" && (fetcher.data.success && jobId !== fetcher.data.jobId && setJobId(fetcher.data.jobId), isProcessing && setIsProcessing(!1)), /* @__PURE__ */ jsxDEV4(Page2, { children: [
    /* @__PURE__ */ jsxDEV4(TitleBar2, { title: "AI Try-On Studio" }, void 0, !1, {
      fileName: "app/routes/app.try-on.tsx",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4(Layout2, { children: [
      /* @__PURE__ */ jsxDEV4(Layout2.Section, { children: /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "500", children: [
        /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h2", variant: "headingMd", children: "\u{1F3AF} AI Virtual Try-On Studio" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 178,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", as: "p", children: "Upload a model image and select a product to see how it looks with our ComfyUI-powered AI try-on technology running on RunPod." }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(InlineStack, { gap: "300", children: [
          /* @__PURE__ */ jsxDEV4(Badge2, { tone: "info", children: "\u{1F916} ComfyUI Workflow" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 188,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Badge2, { tone: "success", children: "\u26A1 RunPod Processing" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 191,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Badge2, { tone: "attention", children: "\u{1F3A8} High Quality Results" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 187,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "300", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingMd", children: "1. Select Product & Variant" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 201,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(
            Select,
            {
              label: "Choose Product",
              options: productOptions,
              value: selectedProduct,
              onChange: setSelectedProduct
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 204,
              columnNumber: 17
            },
            this
          ),
          variantOptions.length > 0 && /* @__PURE__ */ jsxDEV4(
            Select,
            {
              label: "Choose Variant",
              options: [
                { label: "Select variant...", value: "" },
                ...variantOptions
              ],
              value: selectedVariant,
              onChange: setSelectedVariant
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 211,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 200,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "300", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingMd", children: "2. Upload Model Image" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(DropZone, { onDrop: handleModelImageDrop, accept: "image/*", children: modelImagePreview ? /* @__PURE__ */ jsxDEV4(Box2, { padding: "400", children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "200", align: "center", children: [
            /* @__PURE__ */ jsxDEV4(
              Thumbnail,
              {
                source: modelImagePreview,
                alt: "Model preview",
                size: "large"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app.try-on.tsx",
                lineNumber: 232,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: "Model image uploaded successfully" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 237,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV4(Button2, { onClick: () => {
              setModelImage(null), setModelImagePreview("");
            }, children: "Remove Image" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 240,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 231,
            columnNumber: 23
          }, this) }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 230,
            columnNumber: 21
          }, this) : /* @__PURE__ */ jsxDEV4(DropZone.FileUpload, {}, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 249,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", tone: "subdued", children: "Upload a clear photo of a person for best try-on results. Recommended: front-facing pose, good lighting, minimal background." }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 224,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "300", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingMd", children: "3. Generate Try-On" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 260,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(InlineStack, { gap: "200", children: [
            /* @__PURE__ */ jsxDEV4(
              Button2,
              {
                variant: "primary",
                onClick: handleTryOnSubmit,
                disabled: !modelImage || !selectedProduct || !selectedVariant || isProcessing,
                loading: isProcessing,
                children: isProcessing ? "Processing..." : "Generate Try-On"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app.try-on.tsx",
                lineNumber: 264,
                columnNumber: 19
              },
              this
            ),
            jobId && /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", tone: "subdued", children: [
              "Job ID: ",
              jobId
            ] }, void 0, !0, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 273,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 263,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 259,
          columnNumber: 15
        }, this),
        fetcher.data?.error && /* @__PURE__ */ jsxDEV4(Banner, { tone: "critical", children: /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: [
          "Error: ",
          fetcher.data.error
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 283,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 282,
          columnNumber: 17
        }, this),
        jobId && /* @__PURE__ */ jsxDEV4(Banner, { tone: "info", children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: "\u{1F680} Try-on job submitted successfully!" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 292,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", tone: "subdued", children: "The ComfyUI workflow is processing your request on RunPod. Results will appear here when ready." }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 295,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 291,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 290,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 176,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 175,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(Layout2.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxDEV4(Card2, { children: /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "300", children: [
        /* @__PURE__ */ jsxDEV4(Text2, { as: "h3", variant: "headingMd", children: "\u{1F527} Technical Setup" }, void 0, !1, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 312,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(BlockStack2, { gap: "200", children: [
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: [
            /* @__PURE__ */ jsxDEV4("strong", { children: "AI Engine:" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 317,
              columnNumber: 19
            }, this),
            " ComfyUI Workflow"
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 316,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: [
            /* @__PURE__ */ jsxDEV4("strong", { children: "Processing:" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 320,
              columnNumber: 19
            }, this),
            " RunPod GPU Instances"
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 319,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: [
            /* @__PURE__ */ jsxDEV4("strong", { children: "Workflow:" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            " Automatic dress fetching from product page"
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 322,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV4(Text2, { variant: "bodyMd", children: [
            /* @__PURE__ */ jsxDEV4("strong", { children: "Input:" }, void 0, !1, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 326,
              columnNumber: 19
            }, this),
            " User model image only"
          ] }, void 0, !0, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 325,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 315,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Text2, { as: "h4", variant: "headingSm", children: "\u{1F4CB} Setup Checklist (Post-Deployment)" }, void 0, !1, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 330,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV4(Box2, { children: /* @__PURE__ */ jsxDEV4("ul", { style: { paddingLeft: "20px", fontSize: "14px" }, children: [
          /* @__PURE__ */ jsxDEV4("li", { children: "Configure RunPod API endpoint" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 335,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("li", { children: "Set ComfyUI workflow ID" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 336,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("li", { children: "Add API keys to environment" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 337,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("li", { children: "Test image processing pipeline" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 338,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV4("li", { children: "Enable result polling system" }, void 0, !1, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 339,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 334,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 311,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 310,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 309,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.try-on.tsx",
      lineNumber: 173,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.try-on.tsx",
    lineNumber: 171,
    columnNumber: 5
  }, this);
}

// app/routes/api.tryon.tsx
var api_tryon_exports = {};
__export(api_tryon_exports, {
  action: () => action,
  loader: () => loader4
});
import { json as json4 } from "@remix-run/node";

// app/services/comfyui.server.ts
var ComfyUIService = class {
  runpodApiKey;
  runpodEndpoint;
  workflowId;
  constructor() {
    this.runpodApiKey = process.env.RUNPOD_API_KEY || "", this.runpodEndpoint = process.env.RUNPOD_ENDPOINT || "", this.workflowId = process.env.COMFYUI_WORKFLOW_ID || "default-tryon-workflow";
  }
  /**
   * Submit try-on job to ComfyUI workflow on RunPod
   * 
   * @param request - Contains model image, garment image, and product info
   * @returns Promise with job submission result
   */
  async submitTryOnJob(request) {
    try {
      let response = await fetch(`${this.runpodEndpoint}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.runpodApiKey}`
        },
        body: JSON.stringify({
          input: {
            workflow_id: request.workflowId || this.workflowId,
            model_image: request.modelImage,
            garment_image: request.garmentImage,
            product_id: request.productId,
            variant_id: request.variantId,
            // ComfyUI workflow parameters
            workflow_params: {
              strength: 0.8,
              // Try-on strength
              guidance_scale: 7.5,
              num_inference_steps: 20,
              seed: -1
              // Random seed
            }
          }
        })
      });
      if (!response.ok)
        throw new Error(`RunPod API error: ${response.status} ${response.statusText}`);
      return {
        success: !0,
        jobId: (await response.json()).id,
        status: "queued"
      };
    } catch (error) {
      return console.error("ComfyUI workflow submission failed:", error), {
        success: !1,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  /**
   * Check the status of a running ComfyUI job
   * 
   * @param jobId - The job ID returned from submitTryOnJob
   * @returns Promise with current job status and result if completed
   */
  async checkJobStatus(jobId) {
    try {
      let response = await fetch(`${this.runpodEndpoint}/status/${jobId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.runpodApiKey}`
        }
      });
      if (!response.ok)
        throw new Error(`RunPod status check failed: ${response.status}`);
      let result = await response.json();
      return {
        success: !0,
        jobId,
        status: result.status,
        resultImage: result.output?.result_image,
        processingTime: result.execution_time
      };
    } catch (error) {
      return console.error("Job status check failed:", error), {
        success: !1,
        status: "failed",
        error: error instanceof Error ? error.message : "Status check failed"
      };
    }
  }
  /**
   * Cancel a running ComfyUI job
   * 
   * @param jobId - The job ID to cancel
   * @returns Promise with cancellation result
   */
  async cancelJob(jobId) {
    try {
      return { success: (await fetch(`${this.runpodEndpoint}/cancel/${jobId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.runpodApiKey}`
        }
      })).ok };
    } catch (error) {
      return {
        success: !1,
        error: error instanceof Error ? error.message : "Cancellation failed"
      };
    }
  }
  /**
   * Validate that the ComfyUI service is available
   * 
   * @returns Promise with service health status
   */
  async healthCheck() {
    try {
      return { healthy: (await fetch(`${this.runpodEndpoint}/health`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.runpodApiKey}`
        }
      })).ok };
    } catch (error) {
      return {
        healthy: !1,
        error: error instanceof Error ? error.message : "Health check failed"
      };
    }
  }
}, comfyUIService = new ComfyUIService();

// app/services/image.server.ts
var ImageService = class {
  /**
   * Fetch product image from Shopify and convert to base64
   * This automatically gets the dress image from the product page
   * 
   * @param imageUrl - Shopify product image URL
   * @param options - Image processing options
   * @returns Promise with base64 encoded image
   */
  async fetchProductImageAsBase64(imageUrl, options = {}) {
    try {
      let response = await fetch(imageUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch product image: ${response.status}`);
      let imageBuffer = await response.arrayBuffer();
      return Buffer.from(imageBuffer).toString("base64");
    } catch (error) {
      throw console.error("Product image fetch failed:", error), new Error("Failed to process product image");
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
  async processModelImage(imageData, options = {}) {
    try {
      let base64Image;
      return typeof imageData == "string" ? base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, "") : base64Image = imageData.toString("base64"), base64Image;
    } catch (error) {
      throw console.error("Model image processing failed:", error), new Error("Failed to process model image");
    }
  }
  /**
   * Validate image format and size
   * 
   * @param base64Image - Base64 encoded image
   * @returns Validation result with image info
   */
  validateImage(base64Image) {
    try {
      return {
        valid: !0,
        size: Buffer.from(base64Image, "base64").length
      };
    } catch {
      return {
        valid: !1,
        error: "Invalid image format"
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
  getOptimizedShopifyImageUrl(originalUrl, width = 1024, height = 1024) {
    return originalUrl.replace(
      /\.(jpg|jpeg|png|webp)/i,
      `_${width}x${height}.$1`
    );
  }
}, imageService = new ImageService();

// app/routes/api.tryon.tsx
var action = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request);
  if (request.method !== "POST")
    return json4({ error: "Method not allowed" }, { status: 405 });
  try {
    let formData = await request.formData(), modelImage = formData.get("modelImage"), productId = formData.get("productId"), variantId = formData.get("variantId"), customerId = formData.get("customerId");
    if (!modelImage || !productId || !variantId)
      return json4({
        error: "Missing required fields: modelImage, productId, variantId"
      }, { status: 400 });
    let product = (await (await admin.graphql(
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
          id: `gid://shopify/Product/${productId}`
        }
      }
    )).json()).data?.product;
    if (!product)
      return json4({ error: "Product not found" }, { status: 404 });
    let garmentImageUrl = product.images.nodes[0]?.url, variant = product.variants.nodes.find(
      (v) => v.id === `gid://shopify/ProductVariant/${variantId}`
    );
    if (variant?.image?.url && (garmentImageUrl = variant.image.url), !garmentImageUrl)
      return json4({ error: "No product image found" }, { status: 400 });
    let processedModelImage = await imageService.processModelImage(modelImage), garmentImageBase64 = await imageService.fetchProductImageAsBase64(
      imageService.getOptimizedShopifyImageUrl(garmentImageUrl, 1024, 1024)
    ), workflowResult = await comfyUIService.submitTryOnJob({
      modelImage: processedModelImage,
      garmentImage: garmentImageBase64,
      productId,
      variantId
    });
    if (!workflowResult.success)
      return json4({
        error: "Failed to submit try-on job",
        details: workflowResult.error
      }, { status: 500 });
    let tryOnId = database.createTryOnResult({
      customerId,
      productId,
      variantId,
      userPhoto: modelImage,
      // Store original upload
      resultImage: "",
      // Will be updated when job completes
      fitScore: 0,
      // Will be calculated after processing
      pose: "front"
      // Default pose
    });
    return json4({
      success: !0,
      jobId: workflowResult.jobId,
      tryOnId,
      status: workflowResult.status,
      message: "Try-on job submitted successfully"
    });
  } catch (error) {
    return console.error("Try-on API error:", error), json4({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}, loader4 = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request), url = new URL(request.url), jobId = url.searchParams.get("jobId"), tryOnId = url.searchParams.get("tryOnId");
  if (!jobId)
    return json4({ error: "Job ID required" }, { status: 400 });
  try {
    let statusResult = await comfyUIService.checkJobStatus(jobId);
    return statusResult.status === "completed" && statusResult.resultImage, json4({
      success: statusResult.success,
      status: statusResult.status,
      resultImage: statusResult.resultImage,
      processingTime: statusResult.processingTime,
      error: statusResult.error
    });
  } catch (error) {
    return console.error("Status check error:", error), json4({
      error: "Failed to check job status"
    }, { status: 500 });
  }
};

// app/routes/products.tsx
var products_exports = {};
__export(products_exports, {
  default: () => Products2
});
import { Link } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function Products2() {
  return /* @__PURE__ */ jsxDEV5("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem"
  }, children: /* @__PURE__ */ jsxDEV5("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ jsxDEV5("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
      /* @__PURE__ */ jsxDEV5(Link, { to: "/", style: {
        color: "#667eea",
        textDecoration: "none",
        fontSize: "1rem",
        marginBottom: "1rem",
        display: "inline-block"
      }, children: "\u2190 Back to Home" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5("h1", { style: {
        fontSize: "2.5rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem"
      }, children: "\u{1F4E6} Product Management" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5("p", { style: { color: "#666", fontSize: "1.1rem" }, children: "Configure your products for AI virtual try-on functionality" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/products.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }, children: [
      {
        id: "1",
        title: "Summer Dress - Blue",
        price: "$89.99",
        image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
        aiReady: !0
      },
      {
        id: "2",
        title: "Evening Gown - Black",
        price: "$159.99",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
        aiReady: !0
      },
      {
        id: "3",
        title: "Casual Dress - Red",
        price: "$69.99",
        image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400",
        aiReady: !1
      },
      {
        id: "4",
        title: "Floral Maxi Dress",
        price: "$119.99",
        image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
        aiReady: !0
      }
    ].map((product) => /* @__PURE__ */ jsxDEV5(
      "div",
      {
        style: {
          border: "2px solid #eee",
          borderRadius: "15px",
          padding: "1.5rem",
          background: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          transition: "transform 0.2s"
        },
        onMouseOver: (e) => e.currentTarget.style.transform = "translateY(-5px)",
        onMouseOut: (e) => e.currentTarget.style.transform = "translateY(0)",
        children: [
          /* @__PURE__ */ jsxDEV5(
            "img",
            {
              src: product.image,
              alt: product.title,
              style: {
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "1rem"
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/products.tsx",
              lineNumber: 89,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV5("h3", { style: { margin: "0 0 0.5rem 0", color: "#333" }, children: product.title }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("p", { style: { margin: "0 0 1rem 0", color: "#667eea", fontSize: "1.2rem", fontWeight: "bold" }, children: product.price }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }, children: /* @__PURE__ */ jsxDEV5("span", { style: {
            padding: "0.3rem 0.8rem",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            background: product.aiReady ? "#e8f5e8" : "#fff3cd",
            color: product.aiReady ? "#2d5a2d" : "#856404"
          }, children: product.aiReady ? "\u2705 AI Ready" : "\u26A0\uFE0F Setup Required" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 106,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 105,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("div", { style: { display: "flex", gap: "0.5rem" }, children: /* @__PURE__ */ jsxDEV5(
            "button",
            {
              style: {
                flex: 1,
                background: product.aiReady ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ccc",
                color: "white",
                border: "none",
                padding: "0.8rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                cursor: product.aiReady ? "pointer" : "not-allowed"
              },
              disabled: !product.aiReady,
              children: product.aiReady ? "\u{1F3AF} Try-On Ready" : "\u{1F527} Configure AI"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/products.tsx",
              lineNumber: 119,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 118,
            columnNumber: 15
          }, this)
        ]
      },
      product.id,
      !0,
      {
        fileName: "app/routes/products.tsx",
        lineNumber: 76,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/products.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { style: {
      marginTop: "3rem",
      padding: "2rem",
      background: "#f8f9ff",
      borderRadius: "15px"
    }, children: [
      /* @__PURE__ */ jsxDEV5("h3", { style: { color: "#333", marginBottom: "1rem" }, children: "\u{1F527} AI Try-On Setup Instructions" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 147,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV5("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }, children: [
        /* @__PURE__ */ jsxDEV5("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV5("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "1. ComfyUI Workflow" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Configure your ComfyUI workflow ID and parameters for optimal try-on results" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 151,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV5("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "2. RunPod API" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 156,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Set up RunPod endpoint and API keys for GPU-powered processing" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 157,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV5("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "3. Image Quality" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 162,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV5("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Ensure product images are high-resolution with clean backgrounds" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 163,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.tsx",
          lineNumber: 161,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/products.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/products.tsx",
      lineNumber: 141,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/products.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/products.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

// app/routes/webhooks.tsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action2
});
var action2 = async ({ request }) => {
  let { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
  );
  if (!admin)
    throw new Response();
  switch (topic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  loader: () => loader5
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData3, Link as Link2 } from "@remix-run/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var loader5 = async () => json5({
  message: "ShootX AI Fashion Try-On App",
  environment: "development"
});
function Index() {
  let { message } = useLoaderData3();
  return /* @__PURE__ */ jsxDEV6("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem",
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }, children: /* @__PURE__ */ jsxDEV6("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ jsxDEV6("div", { style: { textAlign: "center", marginBottom: "3rem" }, children: [
      /* @__PURE__ */ jsxDEV6("div", { style: {
        fontSize: "3rem",
        fontWeight: "bold",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1rem"
      }, children: "\u{1F3AF} ShootX" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("h1", { style: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "1rem",
        fontWeight: "600"
      }, children: "AI Fashion Try-On for Shopify" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { style: {
        color: "#666",
        fontSize: "1.2rem",
        maxWidth: "600px",
        margin: "0 auto",
        lineHeight: "1.6"
      }, children: "Revolutionary ComfyUI-powered virtual try-on technology running on RunPod. Upload your photo, select any dress, and see instant AI-generated results." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginBottom: "3rem"
    }, children: [
      /* @__PURE__ */ jsxDEV6("div", { style: {
        padding: "2rem",
        background: "#f8f9ff",
        borderRadius: "15px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxDEV6("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F916}" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("h3", { style: { color: "#333", marginBottom: "1rem" }, children: "ComfyUI Workflow" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("p", { style: { color: "#666", lineHeight: "1.6" }, children: "Advanced AI processing with ComfyUI workflows optimized for fashion try-on scenarios" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { style: {
        padding: "2rem",
        background: "#f0fff4",
        borderRadius: "15px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxDEV6("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u26A1" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 88,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("h3", { style: { color: "#333", marginBottom: "1rem" }, children: "RunPod Processing" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 89,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("p", { style: { color: "#666", lineHeight: "1.6" }, children: "High-performance GPU processing on RunPod for fast, high-quality results" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { style: {
        padding: "2rem",
        background: "#fff5f5",
        borderRadius: "15px",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsxDEV6("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F3A8}" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 101,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("h3", { style: { color: "#333", marginBottom: "1rem" }, children: "Auto Dress Fetch" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 102,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("p", { style: { color: "#666", lineHeight: "1.6" }, children: "Automatically fetches dress images from product pages - users only upload their photo" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 103,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 95,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { style: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxDEV6(
        Link2,
        {
          to: "/app/try-on",
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
            transition: "transform 0.2s"
          },
          onMouseOver: (e) => e.currentTarget.style.transform = "translateY(-2px)",
          onMouseOut: (e) => e.currentTarget.style.transform = "translateY(0)",
          children: "\u{1F680} Try-On Studio"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 116,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV6(
        Link2,
        {
          to: "/app/products",
          style: {
            background: "white",
            color: "#667eea",
            border: "2px solid #667eea",
            padding: "1rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            transition: "all 0.2s"
          },
          onMouseOver: (e) => {
            e.currentTarget.style.background = "#667eea", e.currentTarget.style.color = "white";
          },
          onMouseOut: (e) => {
            e.currentTarget.style.background = "white", e.currentTarget.style.color = "#667eea";
          },
          children: "\u{1F4E6} Manage Products"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 135,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV6("div", { style: {
      marginTop: "3rem",
      padding: "2rem",
      background: "#f8f9fa",
      borderRadius: "15px"
    }, children: [
      /* @__PURE__ */ jsxDEV6("h3", { style: { color: "#333", marginBottom: "1rem", textAlign: "center" }, children: "\u{1F527} Ready for RunPod Integration" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 168,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        fontSize: "0.9rem",
        color: "#666"
      }, children: [
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("strong", { children: "\u2705 ComfyUI Service:" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 179,
            columnNumber: 15
          }, this),
          " Pre-configured for workflow submission"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 178,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("strong", { children: "\u2705 Image Processing:" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 182,
            columnNumber: 15
          }, this),
          " Automatic product image fetching"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 181,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("strong", { children: "\u2705 API Routes:" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 185,
            columnNumber: 15
          }, this),
          " Ready for RunPod endpoint integration"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 184,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("strong", { children: "\u2705 Database:" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 188,
            columnNumber: 15
          }, this),
          " Job tracking and result storage"
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 187,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 171,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 162,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 22,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}

// app/routes/try-on.tsx
var try_on_exports = {};
__export(try_on_exports, {
  default: () => TryOnStudio2
});
import { useState as useState2, useRef as useRef2 } from "react";
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function TryOnStudio2() {
  let [selectedProduct, setSelectedProduct] = useState2(""), [modelImage, setModelImage] = useState2(null), [modelImagePreview, setModelImagePreview] = useState2(""), [isProcessing, setIsProcessing] = useState2(!1), [jobId, setJobId] = useState2(""), fileInputRef = useRef2(null), products = [
    { id: "1", title: "Summer Dress - Blue", image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "2", title: "Evening Gown - Black", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: "3", title: "Casual Dress - Red", image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400" }
  ], handleImageUpload = (event) => {
    let file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setModelImage(file);
      let reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result);
      }, reader.readAsDataURL(file);
    }
  }, handleTryOnSubmit = async () => {
    !modelImage || !selectedProduct || (setIsProcessing(!0), setJobId(`job_${Date.now()}`), setTimeout(() => {
      setIsProcessing(!1);
    }, 3e3));
  };
  return /* @__PURE__ */ jsxDEV7("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    padding: "2rem"
  }, children: /* @__PURE__ */ jsxDEV7("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ jsxDEV7("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
      /* @__PURE__ */ jsxDEV7(Link3, { to: "/", style: {
        color: "#f5576c",
        textDecoration: "none",
        fontSize: "1rem",
        marginBottom: "1rem",
        display: "inline-block"
      }, children: "\u2190 Back to Home" }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("h1", { style: {
        fontSize: "2.5rem",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem"
      }, children: "\u{1F3AF} AI Try-On Studio" }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 67,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("p", { style: { color: "#666", fontSize: "1.1rem" }, children: "Upload your photo and select a dress to see how it looks with ComfyUI AI" }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }, children: [
      /* @__PURE__ */ jsxDEV7("div", { children: [
        /* @__PURE__ */ jsxDEV7("h3", { style: { marginBottom: "1rem", color: "#333" }, children: "1. Select a Dress" }, void 0, !1, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { style: { display: "grid", gap: "1rem" }, children: products.map((product) => /* @__PURE__ */ jsxDEV7(
          "div",
          {
            onClick: () => setSelectedProduct(product.id),
            style: {
              border: selectedProduct === product.id ? "3px solid #f5576c" : "2px solid #eee",
              borderRadius: "10px",
              padding: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              transition: "all 0.2s",
              background: selectedProduct === product.id ? "#fff5f5" : "white"
            },
            children: [
              /* @__PURE__ */ jsxDEV7(
                "img",
                {
                  src: product.image,
                  alt: product.title,
                  style: {
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/try-on.tsx",
                  lineNumber: 102,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV7("div", { children: [
                /* @__PURE__ */ jsxDEV7("h4", { style: { margin: 0, color: "#333" }, children: product.title }, void 0, !1, {
                  fileName: "app/routes/try-on.tsx",
                  lineNumber: 113,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV7("p", { style: { margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }, children: "Click to select for try-on" }, void 0, !1, {
                  fileName: "app/routes/try-on.tsx",
                  lineNumber: 114,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 112,
                columnNumber: 19
              }, this)
            ]
          },
          product.id,
          !0,
          {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 87,
            columnNumber: 17
          },
          this
        )) }, void 0, !1, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { children: [
        /* @__PURE__ */ jsxDEV7("h3", { style: { marginBottom: "1rem", color: "#333" }, children: "2. Upload Your Photo" }, void 0, !1, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(
          "div",
          {
            onClick: () => fileInputRef.current?.click(),
            style: {
              border: "2px dashed #ddd",
              borderRadius: "10px",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: modelImagePreview ? "transparent" : "#fafafa"
            },
            children: modelImagePreview ? /* @__PURE__ */ jsxDEV7("div", { children: [
              /* @__PURE__ */ jsxDEV7(
                "img",
                {
                  src: modelImagePreview,
                  alt: "Model preview",
                  style: {
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "1rem"
                  }
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/try-on.tsx",
                  lineNumber: 144,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV7("p", { style: { color: "#666", margin: 0 }, children: "Click to change image" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 155,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/try-on.tsx",
              lineNumber: 143,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV7("div", { children: [
              /* @__PURE__ */ jsxDEV7("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F4F8}" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 159,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV7("p", { style: { color: "#666", margin: 0 }, children: "Click to upload your photo" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 160,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV7("p", { style: { color: "#999", fontSize: "0.9rem", marginTop: "0.5rem" }, children: "Best results with front-facing photos" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 161,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/try-on.tsx",
              lineNumber: 158,
              columnNumber: 17
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 126,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            onChange: handleImageUpload,
            style: { display: "none" }
          },
          void 0,
          !1,
          {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 167,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 124,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { style: { textAlign: "center", marginTop: "2rem" }, children: /* @__PURE__ */ jsxDEV7(
      "button",
      {
        onClick: handleTryOnSubmit,
        disabled: !modelImage || !selectedProduct || isProcessing,
        style: {
          background: !modelImage || !selectedProduct || isProcessing ? "#ccc" : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          border: "none",
          padding: "1rem 3rem",
          borderRadius: "50px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          cursor: !modelImage || !selectedProduct || isProcessing ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: "0 10px 20px rgba(245, 87, 108, 0.3)"
        },
        children: isProcessing ? "\u{1F504} Processing with ComfyUI..." : "\u{1F680} Generate Try-On"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 179,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 178,
      columnNumber: 9
    }, this),
    jobId && /* @__PURE__ */ jsxDEV7("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#e8f5e8",
      borderRadius: "10px",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxDEV7("p", { style: { margin: 0, color: "#2d5a2d" }, children: [
        "\u2705 Try-on job submitted! Job ID: ",
        jobId
      ] }, void 0, !0, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 210,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("p", { style: { margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }, children: "ComfyUI workflow is processing your request on RunPod..." }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 213,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 203,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#f8f9ff",
      borderRadius: "10px",
      fontSize: "0.9rem",
      color: "#666"
    }, children: [
      /* @__PURE__ */ jsxDEV7("strong", { children: "\u{1F527} How it works:" }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 228,
        columnNumber: 11
      }, this),
      " Your model image + selected dress \u2192 ComfyUI Workflow \u2192 RunPod Processing \u2192 AI Try-On Result"
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 220,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/try-on.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/try-on.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-PLHDMDJB.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-ODW4SEMK.js", "/build/_shared/chunk-U5E2PCIK.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-IGXN4ZU4.js", imports: ["/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-INVIVFKG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/api.tryon": { id: "routes/api.tryon", parentId: "root", path: "api/tryon", index: void 0, caseSensitive: void 0, module: "/build/routes/api.tryon-AQPNPWKU.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.products": { id: "routes/app.products", parentId: "root", path: "app/products", index: void 0, caseSensitive: void 0, module: "/build/routes/app.products-KJO557Y7.js", imports: ["/build/_shared/chunk-LZ6DFBPK.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.try-on": { id: "routes/app.try-on", parentId: "root", path: "app/try-on", index: void 0, caseSensitive: void 0, module: "/build/routes/app.try-on-JWVBUQYH.js", imports: ["/build/_shared/chunk-LZ6DFBPK.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/products": { id: "routes/products", parentId: "root", path: "products", index: void 0, caseSensitive: void 0, module: "/build/routes/products-SXXYLPOH.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/try-on": { id: "routes/try-on", parentId: "root", path: "try-on", index: void 0, caseSensitive: void 0, module: "/build/routes/try-on-TVMCYXKN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-YCEDH7MD.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "2cb4eaed", hmr: { runtime: "/build/_shared/chunk-U5E2PCIK.js", timestamp: 1758735626017 }, url: "/build/manifest-2CB4EAED.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.products": {
    id: "routes/app.products",
    parentId: "root",
    path: "app/products",
    index: void 0,
    caseSensitive: void 0,
    module: app_products_exports
  },
  "routes/app.try-on": {
    id: "routes/app.try-on",
    parentId: "root",
    path: "app/try-on",
    index: void 0,
    caseSensitive: void 0,
    module: app_try_on_exports
  },
  "routes/api.tryon": {
    id: "routes/api.tryon",
    parentId: "root",
    path: "api/tryon",
    index: void 0,
    caseSensitive: void 0,
    module: api_tryon_exports
  },
  "routes/products": {
    id: "routes/products",
    parentId: "root",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: products_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/try-on": {
    id: "routes/try-on",
    parentId: "root",
    path: "try-on",
    index: void 0,
    caseSensitive: void 0,
    module: try_on_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
