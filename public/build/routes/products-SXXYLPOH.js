import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  Link
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

// app/routes/products.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/products.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/products.tsx"
  );
  import.meta.hot.lastModified = "1758735015797";
}
function Products() {
  const products = [{
    id: "1",
    title: "Summer Dress - Blue",
    price: "$89.99",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
    aiReady: true
  }, {
    id: "2",
    title: "Evening Gown - Black",
    price: "$159.99",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    aiReady: true
  }, {
    id: "3",
    title: "Casual Dress - Red",
    price: "$69.99",
    image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400",
    aiReady: false
  }, {
    id: "4",
    title: "Floral Maxi Dress",
    price: "$119.99",
    image: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400",
    aiReady: true
  }];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem"
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      textAlign: "center",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", style: {
        color: "#667eea",
        textDecoration: "none",
        fontSize: "1rem",
        marginBottom: "1rem",
        display: "inline-block"
      }, children: "\u2190 Back to Home" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        fontSize: "2.5rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem"
      }, children: "\u{1F4E6} Product Management" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "#666",
        fontSize: "1.1rem"
      }, children: "Configure your products for AI virtual try-on functionality" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/products.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem"
    }, children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      border: "2px solid #eee",
      borderRadius: "15px",
      padding: "1.5rem",
      background: "white",
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      transition: "transform 0.2s"
    }, onMouseOver: (e) => e.currentTarget.style.transform = "translateY(-5px)", onMouseOut: (e) => e.currentTarget.style.transform = "translateY(0)", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.image, alt: product.title, style: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "1rem"
      } }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 105,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        margin: "0 0 0.5rem 0",
        color: "#333"
      }, children: product.title }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 112,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        margin: "0 0 1rem 0",
        color: "#667eea",
        fontSize: "1.2rem",
        fontWeight: "bold"
      }, children: product.price }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 116,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
        padding: "0.3rem 0.8rem",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "bold",
        background: product.aiReady ? "#e8f5e8" : "#fff3cd",
        color: product.aiReady ? "#2d5a2d" : "#856404"
      }, children: product.aiReady ? "\u2705 AI Ready" : "\u26A0\uFE0F Setup Required" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 131,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 125,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        gap: "0.5rem"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { style: {
        flex: 1,
        background: product.aiReady ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ccc",
        color: "white",
        border: "none",
        padding: "0.8rem",
        borderRadius: "8px",
        fontSize: "0.9rem",
        fontWeight: "bold",
        cursor: product.aiReady ? "pointer" : "not-allowed"
      }, disabled: !product.aiReady, children: product.aiReady ? "\u{1F3AF} Try-On Ready" : "\u{1F527} Configure AI" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 147,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 143,
        columnNumber: 15
      }, this)
    ] }, product.id, true, {
      fileName: "app/routes/products.tsx",
      lineNumber: 97,
      columnNumber: 36
    }, this)) }, void 0, false, {
      fileName: "app/routes/products.tsx",
      lineNumber: 92,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "3rem",
      padding: "2rem",
      background: "#f8f9ff",
      borderRadius: "15px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        color: "#333",
        marginBottom: "1rem"
      }, children: "\u{1F527} AI Try-On Setup Instructions" }, void 0, false, {
        fileName: "app/routes/products.tsx",
        lineNumber: 171,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          padding: "1rem",
          background: "white",
          borderRadius: "10px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
            color: "#667eea",
            margin: "0 0 0.5rem 0"
          }, children: "1. ComfyUI Workflow" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 185,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: 0,
            fontSize: "0.9rem",
            color: "#666"
          }, children: "Configure your ComfyUI workflow ID and parameters for optimal try-on results" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 189,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/products.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          padding: "1rem",
          background: "white",
          borderRadius: "10px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
            color: "#667eea",
            margin: "0 0 0.5rem 0"
          }, children: "2. RunPod API" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 202,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: 0,
            fontSize: "0.9rem",
            color: "#666"
          }, children: "Set up RunPod endpoint and API keys for GPU-powered processing" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 206,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/products.tsx",
          lineNumber: 197,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          padding: "1rem",
          background: "white",
          borderRadius: "10px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
            color: "#667eea",
            margin: "0 0 0.5rem 0"
          }, children: "3. Image Quality" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            margin: 0,
            fontSize: "0.9rem",
            color: "#666"
          }, children: "Ensure product images are high-resolution with clean backgrounds" }, void 0, false, {
            fileName: "app/routes/products.tsx",
            lineNumber: 223,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/products.tsx",
          lineNumber: 214,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/products.tsx",
        lineNumber: 175,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/products.tsx",
      lineNumber: 165,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/products.tsx",
    lineNumber: 54,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/products.tsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}
_c = Products;
var _c;
$RefreshReg$(_c, "Products");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Products as default
};
//# sourceMappingURL=/build/routes/products-SXXYLPOH.js.map
