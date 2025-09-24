import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  DataTable,
  Layout,
  Page,
  Text,
  TitleBar,
  require_shopify
} from "/build/_shared/chunk-LZ6DFBPK.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  useLoaderData
} from "/build/_shared/chunk-ODW4SEMK.js";
import {
  createHotContext
} from "/build/_shared/chunk-U5E2PCIK.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.products.tsx
var import_node = __toESM(require_node(), 1);
var import_shopify = __toESM(require_shopify(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.products.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.products.tsx"
  );
  import.meta.hot.lastModified = "1758733863615";
}
function Products() {
  _s();
  const {
    products
  } = useLoaderData();
  const rows = products.map((product) => [product.title, product.handle, product.variants.nodes[0]?.price || "N/A", product.totalInventory || 0, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: "success", children: "AI Ready" }, product.id, false, {
    fileName: "app/routes/app.products.tsx",
    lineNumber: 75,
    columnNumber: 144
  }, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { size: "slim", children: "Configure AI" }, `edit-${product.id}`, false, {
    fileName: "app/routes/app.products.tsx",
    lineNumber: 77,
    columnNumber: 15
  }, this)]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TitleBar, { title: "Product Management" }, void 0, false, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "AI Try-On Product Configuration" }, void 0, false, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: "Configure your products for AI virtual try-on functionality. Products need proper images and metadata for optimal AI processing." }, void 0, false, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this),
      products.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DataTable, { columnContentTypes: ["text", "text", "text", "numeric", "text", "text"], headings: ["Product", "Handle", "Price", "Inventory", "AI Status", "Actions"], rows }, void 0, false, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 96,
        columnNumber: 38
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { padding: "400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", align: "center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "p", variant: "bodyMd", children: "No products found. Create some products in your Shopify admin first." }, void 0, false, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 98,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { url: `https://${process.env.SHOP_DOMAIN || "your-shop"}.myshopify.com/admin/products`, target: "_blank", children: "Go to Products" }, void 0, false, {
          fileName: "app/routes/app.products.tsx",
          lineNumber: 101,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 97,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/app.products.tsx",
        lineNumber: 96,
        columnNumber: 218
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 85,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 83,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app.products.tsx",
      lineNumber: 82,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.products.tsx",
    lineNumber: 80,
    columnNumber: 10
  }, this);
}
_s(Products, "myEvnF20fcYyfWpqSQ3PXWXvEBg=", false, function() {
  return [useLoaderData];
});
_c = Products;
var _c;
$RefreshReg$(_c, "Products");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Products as default
};
//# sourceMappingURL=/build/routes/app.products-KJO557Y7.js.map
