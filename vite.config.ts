import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
    include: ["@shopify/shopify-app-remix"],
  },
  server: {
    port: 3000,
    host: true,
  },
});
