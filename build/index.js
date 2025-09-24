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
import { jsxDEV } from "react/jsx-dev-runtime";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = renderToString(
    /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
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
  default: () => App
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsxDEV2("html", { children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("title", { children: "Error" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2("div", { style: { padding: "2rem", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxDEV2("h1", { children: "Something went wrong" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 39,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV2("p", { children: "Please try refreshing the page." }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}

// app/routes/products.tsx
var products_exports = {};
__export(products_exports, {
  default: () => Products
});
import { Link } from "@remix-run/react";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
function Products() {
  return /* @__PURE__ */ jsxDEV3("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem"
  }, children: /* @__PURE__ */ jsxDEV3("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ jsxDEV3("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
      /* @__PURE__ */ jsxDEV3(Link, { to: "/", style: {
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
      /* @__PURE__ */ jsxDEV3("h1", { style: {
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
      /* @__PURE__ */ jsxDEV3("p", { style: { color: "#666", fontSize: "1.1rem" }, children: "Configure your products for AI virtual try-on functionality" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/products.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV3("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }, children: [
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
    ].map((product) => /* @__PURE__ */ jsxDEV3(
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
          /* @__PURE__ */ jsxDEV3(
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
          /* @__PURE__ */ jsxDEV3("h3", { style: { margin: "0 0 0.5rem 0", color: "#333" }, children: product.title }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { style: { margin: "0 0 1rem 0", color: "#667eea", fontSize: "1.2rem", fontWeight: "bold" }, children: product.price }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }, children: /* @__PURE__ */ jsxDEV3("span", { style: {
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
          /* @__PURE__ */ jsxDEV3("div", { style: { display: "flex", gap: "0.5rem" }, children: /* @__PURE__ */ jsxDEV3(
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
    /* @__PURE__ */ jsxDEV3("div", { style: {
      marginTop: "3rem",
      padding: "2rem",
      background: "#f8f9ff",
      borderRadius: "15px"
    }, children: [
      /* @__PURE__ */ jsxDEV3("h3", { style: { color: "#333", marginBottom: "1rem" }, children: "\u{1F527} AI Try-On Setup Instructions" }, void 0, !1, {
        fileName: "app/routes/products.tsx",
        lineNumber: 147,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV3("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }, children: [
        /* @__PURE__ */ jsxDEV3("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV3("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "1. ComfyUI Workflow" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Configure your ComfyUI workflow ID and parameters for optimal try-on results" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 151,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV3("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "2. RunPod API" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 156,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Set up RunPod endpoint and API keys for GPU-powered processing" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 157,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/products.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { padding: "1rem", background: "white", borderRadius: "10px" }, children: [
          /* @__PURE__ */ jsxDEV3("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "3. Image Quality" }, void 0, !1, {
            fileName: "app/routes/products.tsx",
            lineNumber: 162,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { style: { margin: 0, fontSize: "0.9rem", color: "#666" }, children: "Ensure product images are high-resolution with clean backgrounds" }, void 0, !1, {
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

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { Link as Link2 } from "@remix-run/react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV4("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "2rem",
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }, children: /* @__PURE__ */ jsxDEV4("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
  }, children: [
    /* @__PURE__ */ jsxDEV4("div", { style: { textAlign: "center", marginBottom: "3rem" }, children: [
      /* @__PURE__ */ jsxDEV4("div", { style: {
        fontSize: "3rem",
        fontWeight: "bold",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "1rem"
      }, children: "\u{1F3AF} ShootX" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 21,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("h1", { style: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "1rem",
        fontWeight: "600"
      }, children: "AI Fashion Try-On for Shopify" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("p", { style: {
        color: "#666",
        fontSize: "1.2rem",
        maxWidth: "600px",
        margin: "0 auto",
        lineHeight: "1.6"
      }, children: "Revolutionary ComfyUI-powered virtual try-on technology running on RunPod. Upload your photo, select any dress, and see instant AI-generated results." }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem"
    }, children: [
      /* @__PURE__ */ jsxDEV4(Link2, { to: "/try-on", style: { textDecoration: "none" }, children: /* @__PURE__ */ jsxDEV4(
        "div",
        {
          style: {
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            padding: "2rem",
            borderRadius: "15px",
            color: "white",
            textAlign: "center",
            transition: "transform 0.2s",
            cursor: "pointer"
          },
          onMouseOver: (e) => e.currentTarget.style.transform = "translateY(-5px)",
          onMouseOut: (e) => e.currentTarget.style.transform = "translateY(0)",
          children: [
            /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F3AF}" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 71,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV4("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.5rem" }, children: "AI Try-On Studio" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 72,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV4("p", { style: { margin: 0, opacity: 0.9 }, children: "Upload your photo and try on dresses with AI" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 73,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 59,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4(Link2, { to: "/products", style: { textDecoration: "none" }, children: /* @__PURE__ */ jsxDEV4(
        "div",
        {
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "2rem",
            borderRadius: "15px",
            color: "white",
            textAlign: "center",
            transition: "transform 0.2s",
            cursor: "pointer"
          },
          onMouseOver: (e) => e.currentTarget.style.transform = "translateY(-5px)",
          onMouseOut: (e) => e.currentTarget.style.transform = "translateY(0)",
          children: [
            /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F4E6}" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 92,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV4("h3", { style: { margin: "0 0 1rem 0", fontSize: "1.5rem" }, children: "Product Management" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 93,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV4("p", { style: { margin: 0, opacity: 0.9 }, children: "Configure products for AI try-on functionality" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 94,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 80,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 52,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { style: {
      marginTop: "4rem",
      padding: "2rem",
      background: "#f8f9ff",
      borderRadius: "15px"
    }, children: [
      /* @__PURE__ */ jsxDEV4("h2", { style: { textAlign: "center", marginBottom: "2rem", color: "#333" }, children: "\u{1F680} Powered by Advanced AI" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV4("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "2rem"
      }, children: [
        /* @__PURE__ */ jsxDEV4("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "\u{1F9E0}" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "ComfyUI Workflows" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 118,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { style: { margin: 0, color: "#666", fontSize: "0.9rem" }, children: "Advanced AI workflows for realistic try-on results" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 119,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "\u26A1" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 124,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "RunPod Processing" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 125,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { style: { margin: 0, color: "#666", fontSize: "0.9rem" }, children: "GPU-powered processing for fast results" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 126,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV4("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxDEV4("div", { style: { fontSize: "2rem", marginBottom: "1rem" }, children: "\u{1F6CD}\uFE0F" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 131,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("h4", { style: { color: "#667eea", margin: "0 0 0.5rem 0" }, children: "Shopify Integration" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 132,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV4("p", { style: { margin: 0, color: "#666", fontSize: "0.9rem" }, children: "Seamless integration with your Shopify store" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 133,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/try-on.tsx
var try_on_exports = {};
__export(try_on_exports, {
  default: () => TryOnStudio
});
import { useState, useRef } from "react";
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function TryOnStudio() {
  let [selectedProduct, setSelectedProduct] = useState(""), [modelImage, setModelImage] = useState(null), [modelImagePreview, setModelImagePreview] = useState(""), [isProcessing, setIsProcessing] = useState(!1), [jobId, setJobId] = useState(""), fileInputRef = useRef(null), products = [
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
  return /* @__PURE__ */ jsxDEV5("div", { style: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
      /* @__PURE__ */ jsxDEV5(Link3, { to: "/", style: {
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
      /* @__PURE__ */ jsxDEV5("h1", { style: {
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
      /* @__PURE__ */ jsxDEV5("p", { style: { color: "#666", fontSize: "1.1rem" }, children: "Upload your photo and select a dress to see how it looks with ComfyUI AI" }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }, children: [
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("h3", { style: { marginBottom: "1rem", color: "#333" }, children: "1. Select a Dress" }, void 0, !1, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV5("div", { style: { display: "grid", gap: "1rem" }, children: products.map((product) => /* @__PURE__ */ jsxDEV5(
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
              /* @__PURE__ */ jsxDEV5(
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
              /* @__PURE__ */ jsxDEV5("div", { children: [
                /* @__PURE__ */ jsxDEV5("h4", { style: { margin: 0, color: "#333" }, children: product.title }, void 0, !1, {
                  fileName: "app/routes/try-on.tsx",
                  lineNumber: 113,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV5("p", { style: { margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }, children: "Click to select for try-on" }, void 0, !1, {
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
      /* @__PURE__ */ jsxDEV5("div", { children: [
        /* @__PURE__ */ jsxDEV5("h3", { style: { marginBottom: "1rem", color: "#333" }, children: "2. Upload Your Photo" }, void 0, !1, {
          fileName: "app/routes/try-on.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV5(
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
            children: modelImagePreview ? /* @__PURE__ */ jsxDEV5("div", { children: [
              /* @__PURE__ */ jsxDEV5(
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
              /* @__PURE__ */ jsxDEV5("p", { style: { color: "#666", margin: 0 }, children: "Click to change image" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 155,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/try-on.tsx",
              lineNumber: 143,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV5("div", { children: [
              /* @__PURE__ */ jsxDEV5("div", { style: { fontSize: "3rem", marginBottom: "1rem" }, children: "\u{1F4F8}" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 159,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV5("p", { style: { color: "#666", margin: 0 }, children: "Click to upload your photo" }, void 0, !1, {
                fileName: "app/routes/try-on.tsx",
                lineNumber: 160,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV5("p", { style: { color: "#999", fontSize: "0.9rem", marginTop: "0.5rem" }, children: "Best results with front-facing photos" }, void 0, !1, {
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
        /* @__PURE__ */ jsxDEV5(
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
    /* @__PURE__ */ jsxDEV5("div", { style: { textAlign: "center", marginTop: "2rem" }, children: /* @__PURE__ */ jsxDEV5(
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
    jobId && /* @__PURE__ */ jsxDEV5("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#e8f5e8",
      borderRadius: "10px",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxDEV5("p", { style: { margin: 0, color: "#2d5a2d" }, children: [
        "\u2705 Try-on job submitted! Job ID: ",
        jobId
      ] }, void 0, !0, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 210,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV5("p", { style: { margin: "0.5rem 0 0 0", color: "#666", fontSize: "0.9rem" }, children: "ComfyUI workflow is processing your request on RunPod..." }, void 0, !1, {
        fileName: "app/routes/try-on.tsx",
        lineNumber: 213,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/try-on.tsx",
      lineNumber: 203,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { style: {
      marginTop: "2rem",
      padding: "1rem",
      background: "#f8f9ff",
      borderRadius: "10px",
      fontSize: "0.9rem",
      color: "#666"
    }, children: [
      /* @__PURE__ */ jsxDEV5("strong", { children: "\u{1F527} How it works:" }, void 0, !1, {
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
var assets_manifest_default = { entry: { module: "/build/entry.client-5VBXVX25.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-PNYCQMQ2.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-U5E2PCIK.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-LUJVB37Y.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-U57EGFO3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/products": { id: "routes/products", parentId: "root", path: "products", index: void 0, caseSensitive: void 0, module: "/build/routes/products-X7XMHIEX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/try-on": { id: "routes/try-on", parentId: "root", path: "try-on", index: void 0, caseSensitive: void 0, module: "/build/routes/try-on-6XAGRLGX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "580301f7", hmr: { runtime: "/build/_shared/chunk-U5E2PCIK.js", timestamp: 1758737659883 }, url: "/build/manifest-580301F7.js" };

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
  "routes/products": {
    id: "routes/products",
    parentId: "root",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: products_exports
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
