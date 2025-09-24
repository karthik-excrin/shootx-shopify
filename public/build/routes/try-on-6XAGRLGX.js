import {
  Link
} from "/build/_shared/chunk-PNYCQMQ2.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-U5E2PCIK.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/try-on.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/try-on.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/try-on.tsx"
  );
  import.meta.hot.lastModified = "1758734983752";
}
function TryOnStudio() {
  _s();
  const [selectedProduct, setSelectedProduct] = (0, import_react.useState)("");
  const [modelImage, setModelImage] = (0, import_react.useState)(null);
  const [modelImagePreview, setModelImagePreview] = (0, import_react.useState)("");
  const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
  const [jobId, setJobId] = (0, import_react.useState)("");
  const fileInputRef = (0, import_react.useRef)(null);
  const products = [{
    id: "1",
    title: "Summer Dress - Blue",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    id: "2",
    title: "Evening Gown - Black",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"
  }, {
    id: "3",
    title: "Casual Dress - Red",
    image: "https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400"
  }];
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setModelImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setModelImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTryOnSubmit = async () => {
    if (!modelImage || !selectedProduct)
      return;
    setIsProcessing(true);
    setJobId(`job_${Date.now()}`);
    setTimeout(() => {
      setIsProcessing(false);
    }, 3e3);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
        color: "#f5576c",
        textDecoration: "none",
        fontSize: "1rem",
        marginBottom: "1rem",
        display: "inline-block"
      }, children: "\u2190 Back to Home" }, void 0, false, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        fontSize: "2.5rem",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem"
      }, children: "\u{1F3AF} AI Try-On Studio" }, void 0, false, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "#666",
        fontSize: "1.1rem"
      }, children: "Upload your photo and select a dress to see how it looks with ComfyUI AI" }, void 0, false, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      alignItems: "start"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
          marginBottom: "1rem",
          color: "#333"
        }, children: "1. Select a Dress" }, void 0, false, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 119,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          display: "grid",
          gap: "1rem"
        }, children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onClick: () => setSelectedProduct(product.id), style: {
          border: selectedProduct === product.id ? "3px solid #f5576c" : "2px solid #eee",
          borderRadius: "10px",
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          transition: "all 0.2s",
          background: selectedProduct === product.id ? "#fff5f5" : "white"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.image, alt: product.title, style: {
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 138,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
              margin: 0,
              color: "#333"
            }, children: product.title }, void 0, false, {
              fileName: "app/routes/try-on.tsx",
              lineNumber: 145,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
              margin: "0.5rem 0 0 0",
              color: "#666",
              fontSize: "0.9rem"
            }, children: "Click to select for try-on" }, void 0, false, {
              fileName: "app/routes/try-on.tsx",
              lineNumber: 149,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 144,
            columnNumber: 19
          }, this)
        ] }, product.id, true, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 127,
          columnNumber: 40
        }, this)) }, void 0, false, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
          marginBottom: "1rem",
          color: "#333"
        }, children: "2. Upload Your Photo" }, void 0, false, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onClick: () => fileInputRef.current?.click(), style: {
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
        }, children: modelImagePreview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: modelImagePreview, alt: "Model preview", style: {
            maxWidth: "200px",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "1rem"
          } }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 181,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: "#666",
            margin: 0
          }, children: "Click to change image" }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 188,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 180,
          columnNumber: 36
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "3rem",
            marginBottom: "1rem"
          }, children: "\u{1F4F8}" }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 193,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: "#666",
            margin: 0
          }, children: "Click to upload your photo" }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 197,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: "#999",
            fontSize: "0.9rem",
            marginTop: "0.5rem"
          }, children: "Best results with front-facing photos" }, void 0, false, {
            fileName: "app/routes/try-on.tsx",
            lineNumber: 201,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 192,
          columnNumber: 26
        }, this) }, void 0, false, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageUpload, style: {
          display: "none"
        } }, void 0, false, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      textAlign: "center",
      marginTop: "2rem"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleTryOnSubmit, disabled: !modelImage || !selectedProduct || isProcessing, style: {
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
    }, children: isProcessing ? "\u{1F504} Processing with ComfyUI..." : "\u{1F680} Generate Try-On" }, void 0, false, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 221,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 217,
      columnNumber: 9
    }, this),
    jobId && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#e8f5e8",
      borderRadius: "10px",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        margin: 0,
        color: "#2d5a2d"
      }, children: [
        "\u2705 Try-on job submitted! Job ID: ",
        jobId
      ] }, void 0, true, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 245,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        margin: "0.5rem 0 0 0",
        color: "#666",
        fontSize: "0.9rem"
      }, children: "ComfyUI workflow is processing your request on RunPod..." }, void 0, false, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 251,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 238,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#f8f9ff",
      borderRadius: "10px",
      fontSize: "0.9rem",
      color: "#666"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "\u{1F527} How it works:" }, void 0, false, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 269,
        columnNumber: 11
      }, this),
      " Your model image + selected dress \u2192 ComfyUI Workflow \u2192 RunPod Processing \u2192 AI Try-On Result"
    ] }, void 0, true, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 261,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/try-on.tsx",
    lineNumber: 73,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/try-on.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
_s(TryOnStudio, "nFHNpS9/9Tb39GLbGpmd+AiwJAo=");
_c = TryOnStudio;
var _c;
$RefreshReg$(_c, "TryOnStudio");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  TryOnStudio as default
};
//# sourceMappingURL=/build/routes/try-on-6XAGRLGX.js.map
