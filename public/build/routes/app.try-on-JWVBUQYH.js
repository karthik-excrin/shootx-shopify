import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  DropZone,
  InlineStack,
  Layout,
  Page,
  Select,
  Text,
  Thumbnail,
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
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-ODW4SEMK.js";
import {
  createHotContext
} from "/build/_shared/chunk-U5E2PCIK.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.try-on.tsx
var import_node = __toESM(require_node(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_shopify = __toESM(require_shopify(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.try-on.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.try-on.tsx"
  );
  import.meta.hot.lastModified = "1758734628651";
}
function TryOnStudio() {
  _s();
  const {
    shop,
    products
  } = useLoaderData();
  const fetcher = useFetcher();
  const [selectedProduct, setSelectedProduct] = (0, import_react2.useState)("");
  const [selectedVariant, setSelectedVariant] = (0, import_react2.useState)("");
  const [modelImage, setModelImage] = (0, import_react2.useState)(null);
  const [modelImagePreview, setModelImagePreview] = (0, import_react2.useState)("");
  const [isProcessing, setIsProcessing] = (0, import_react2.useState)(false);
  const [jobId, setJobId] = (0, import_react2.useState)("");
  const [tryOnResult, setTryOnResult] = (0, import_react2.useState)("");
  const fileInputRef = (0, import_react2.useRef)(null);
  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const variantOptions = selectedProductData?.variants.nodes.map((variant) => ({
    label: variant.title,
    value: variant.id
  })) || [];
  const productOptions = [{
    label: "Select a product...",
    value: ""
  }, ...products.map((product) => ({
    label: product.title,
    value: product.id
  }))];
  const handleModelImageDrop = (0, import_react2.useCallback)((files) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setModelImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleTryOnSubmit = async () => {
    if (!modelImage || !selectedProduct || !selectedVariant) {
      return;
    }
    setIsProcessing(true);
    try {
      const base64Image = await fileToBase64(modelImage);
      const productId = selectedProduct.replace("gid://shopify/Product/", "");
      const variantId = selectedVariant.replace("gid://shopify/ProductVariant/", "");
      const formData = new FormData();
      formData.append("modelImage", base64Image);
      formData.append("productId", productId);
      formData.append("variantId", variantId);
      formData.append("customerId", "demo-customer");
      fetcher.submit(formData, {
        method: "POST",
        action: "/api/tryon"
      });
    } catch (error) {
      console.error("Try-on submission failed:", error);
      setIsProcessing(false);
    }
  };
  if (fetcher.data && fetcher.state === "idle") {
    if (fetcher.data.success && jobId !== fetcher.data.jobId) {
      setJobId(fetcher.data.jobId);
    }
    if (isProcessing) {
      setIsProcessing(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TitleBar, { title: "AI Try-On Studio" }, void 0, false, {
      fileName: "app/routes/app.try-on.tsx",
      lineNumber: 174,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "\u{1F3AF} AI Virtual Try-On Studio" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 180,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: "Upload a model image and select a product to see how it looks with our ComfyUI-powered AI try-on technology running on RunPod." }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 183,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 179,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: "info", children: "\u{1F916} ComfyUI Workflow" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 190,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: "success", children: "\u26A1 RunPod Processing" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 193,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, { tone: "attention", children: "\u{1F3A8} High Quality Results" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 196,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 189,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingMd", children: "1. Select Product & Variant" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "Choose Product", options: productOptions, value: selectedProduct, onChange: setSelectedProduct }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 206,
            columnNumber: 17
          }, this),
          variantOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, { label: "Choose Variant", options: [{
            label: "Select variant...",
            value: ""
          }, ...variantOptions], value: selectedVariant, onChange: setSelectedVariant }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 207,
            columnNumber: 47
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 202,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingMd", children: "2. Upload Model Image" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 215,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropZone, { onDrop: handleModelImageDrop, accept: "image/*", children: modelImagePreview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { padding: "400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", align: "center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Thumbnail, { source: modelImagePreview, alt: "Model preview", size: "large" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 221,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: "Model image uploaded successfully" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 222,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: () => {
              setModelImage(null);
              setModelImagePreview("");
            }, children: "Remove Image" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 225,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 220,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 219,
            columnNumber: 40
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropZone.FileUpload, {}, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 232,
            columnNumber: 30
          }, this) }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 218,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", children: "Upload a clear photo of a person for best try-on results. Recommended: front-facing pose, good lighting, minimal background." }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 214,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingMd", children: "3. Generate Try-On" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 242,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "primary", onClick: handleTryOnSubmit, disabled: !modelImage || !selectedProduct || !selectedVariant || isProcessing, loading: isProcessing, children: isProcessing ? "Processing..." : "Generate Try-On" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 246,
              columnNumber: 19
            }, this),
            jobId && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", children: [
              "Job ID: ",
              jobId
            ] }, void 0, true, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 249,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 245,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 241,
          columnNumber: 15
        }, this),
        fetcher.data?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banner, { tone: "critical", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: [
          "Error: ",
          fetcher.data.error
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 257,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 256,
          columnNumber: 39
        }, this),
        jobId && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banner, { tone: "info", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: "\u{1F680} Try-on job submitted successfully!" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 264,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", tone: "subdued", children: "The ComfyUI workflow is processing your request on RunPod. Results will appear here when ready." }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 267,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 263,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 262,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 178,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 177,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 176,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h3", variant: "headingMd", children: "\u{1F527} Technical Setup" }, void 0, false, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 283,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "AI Engine:" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 288,
              columnNumber: 19
            }, this),
            " ComfyUI Workflow"
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 287,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Processing:" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 291,
              columnNumber: 19
            }, this),
            " RunPod GPU Instances"
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 290,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Workflow:" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 294,
              columnNumber: 19
            }, this),
            " Automatic dress fetching from product page"
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 293,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Input:" }, void 0, false, {
              fileName: "app/routes/app.try-on.tsx",
              lineNumber: 297,
              columnNumber: 19
            }, this),
            " User model image only"
          ] }, void 0, true, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 286,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h4", variant: "headingSm", children: "\u{1F4CB} Setup Checklist (Post-Deployment)" }, void 0, false, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 301,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
          paddingLeft: "20px",
          fontSize: "14px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Configure RunPod API endpoint" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 309,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Set ComfyUI workflow ID" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 310,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Add API keys to environment" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 311,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Test image processing pipeline" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 312,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Enable result polling system" }, void 0, false, {
            fileName: "app/routes/app.try-on.tsx",
            lineNumber: 313,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 305,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.try-on.tsx",
          lineNumber: 304,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 282,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.try-on.tsx",
        lineNumber: 280,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.try-on.tsx",
      lineNumber: 175,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.try-on.tsx",
    lineNumber: 173,
    columnNumber: 10
  }, this);
}
_s(TryOnStudio, "g5i5lkjMwbwHkE4cB/kXDYf8l2c=", false, function() {
  return [useLoaderData, useFetcher];
});
_c = TryOnStudio;
var _c;
$RefreshReg$(_c, "TryOnStudio");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  TryOnStudio as default
};
//# sourceMappingURL=/build/routes/app.try-on-JWVBUQYH.js.map
