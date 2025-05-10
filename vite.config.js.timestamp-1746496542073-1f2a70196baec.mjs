// vite.config.js
import { defineConfig } from "file:///C:/laragon/www/pitcar-booking/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/laragon/www/pitcar-booking/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// package.json
var package_default = {
  name: "pitcar-marketing",
  private: true,
  version: "2.7.23",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview"
  },
  dependencies: {
    "@headlessui/vue": "^1.7.23",
    "@heroicons/vue": "^2.2.0",
    "@tiptap/extension-mention": "^2.11.7",
    "@tiptap/extension-placeholder": "^2.11.7",
    "@tiptap/starter-kit": "^2.11.7",
    "@tiptap/vue-3": "^2.11.7",
    "@vueup/vue-quill": "^1.2.0",
    "@vueuse/core": "^13.0.0",
    axios: "^1.7.8",
    "chart.js": "^4.4.6",
    "date-fns": "^4.1.0",
    dompurify: "^3.2.4",
    lodash: "^4.17.21",
    "lucide-vue-next": "^0.475.0",
    marked: "^15.0.7",
    pinia: "^2.2.6",
    "vite-plugin-pwa": "^0.21.0",
    vue: "^3.5.13",
    "vue-chartjs": "^5.3.2",
    "vue-quill": "^1.5.1",
    "vue-router": "^4.5.0",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^5.2.1",
    autoprefixer: "^10.4.20",
    postcss: "^8.4.49",
    tailwindcss: "^3.4.15",
    vite: "^5.4.10"
  }
};

// vite.config.js
import { VitePWA } from "file:///C:/laragon/www/pitcar-booking/node_modules/vite-plugin-pwa/dist/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///C:/laragon/www/pitcar-booking/vite.config.js";
var timestamp = (/* @__PURE__ */ new Date()).getTime();
var safeVersion = package_default.version.replace(/\./g, "-");
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["pitcar.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "JARVIS - Smart Dashboard PITCAR",
        short_name: "JARVIS",
        description: "JARVIS - Smart Dashboard PITCAR",
        theme_color: "#B70000",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
            // Combine purposes
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png"
          }
        ],
        start_url: "/",
        scope: "/",
        orientation: "portrait"
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/sokasistem\.pitcar\.co\.id\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60
                // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10
              // Timeout after 10 seconds
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html"
      }
    })
  ],
  define: {
    "__APP_VERSION__": JSON.stringify(safeVersion),
    "__BUILD_TIME__": JSON.stringify((/* @__PURE__ */ new Date()).toISOString())
  },
  server: {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    },
    proxy: {
      "/web": {
        target: "https://sokasistem.pitcar.co.id",
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.error("\u{1F6A8} Proxy error:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            proxyReq.setHeader("Origin", "https://sokasistem.pitcar.co.id");
            const cookies = req.headers.cookie;
            if (cookies) {
              proxyReq.setHeader("Cookie", cookies);
            }
            proxyReq.setHeader("X-App-Version", package_default.version);
            console.log("\u{1F4E1} Proxying request:", {
              url: req.url,
              method: req.method,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("\u2705 Response received:", {
              url: req.url,
              status: proxyRes.statusCode,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            });
          });
        }
      }
    },
    host: true
  },
  build: {
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-${safeVersion}-${timestamp}.[hash].js`,
        chunkFileNames: `assets/[name]-${safeVersion}-${timestamp}.[hash].js`,
        assetFileNames: `assets/[name]-${safeVersion}-${timestamp}.[hash].[ext]`
      }
    },
    // Add these options
    terserOptions: {
      compress: {
        drop_console: true,
        // Remove console.logs in production
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcbGFyYWdvblxcXFx3d3dcXFxccGl0Y2FyLWJvb2tpbmdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGxhcmFnb25cXFxcd3d3XFxcXHBpdGNhci1ib29raW5nXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9sYXJhZ29uL3d3dy9waXRjYXItYm9va2luZy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5jb25zdCBzYWZlVmVyc2lvbiA9IHBrZy52ZXJzaW9uLnJlcGxhY2UoL1xcLi9nLCAnLScpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgaW5jbHVkZUFzc2V0czogWydwaXRjYXIuaWNvJywgJ2FwcGxlLXRvdWNoLWljb24ucG5nJywgJ21hc2staWNvbi5zdmcnXSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdKQVJWSVMgLSBTbWFydCBEYXNoYm9hcmQgUElUQ0FSJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ0pBUlZJUycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSkFSVklTIC0gU21hcnQgRGFzaGJvYXJkIFBJVENBUicsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI0I3MDAwMCcsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyAgLy8gQ29tYmluZSBwdXJwb3Nlc1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnkgbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxODB4MTgwJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBzdGFydF91cmw6ICcvJyxcbiAgICAgICAgc2NvcGU6ICcvJyxcbiAgICAgICAgb3JpZW50YXRpb246ICdwb3J0cmFpdCdcbiAgICAgIH0sXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgICAgICAgc2tpcFdhaXRpbmc6IHRydWUsXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnfSddLFxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnZ29vZ2xlLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdzdGF0aWNcXC5jb21cXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdnc3RhdGljLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9zb2thc2lzdGVtXFwucGl0Y2FyXFwuY29cXC5pZFxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnTmV0d29ya0ZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnYXBpLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDUgKiA2MCAvLyA1IG1pbnV0ZXNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICBzdGF0dXNlczogWzAsIDIwMF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmV0d29ya1RpbWVvdXRTZWNvbmRzOiAxMCAvLyBUaW1lb3V0IGFmdGVyIDEwIHNlY29uZHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCdcbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBkZWZpbmU6IHtcbiAgICAnX19BUFBfVkVSU0lPTl9fJzogSlNPTi5zdHJpbmdpZnkoc2FmZVZlcnNpb24pLFxuICAgICdfX0JVSUxEX1RJTUVfXyc6IEpTT04uc3RyaW5naWZ5KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSlcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnLFxuICAgICAgJ1ByYWdtYSc6ICduby1jYWNoZScsXG4gICAgICAnRXhwaXJlcyc6ICcwJ1xuICAgIH0sXG4gICAgcHJveHk6IHtcbiAgICAgICcvd2ViJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3Nva2FzaXN0ZW0ucGl0Y2FyLmNvLmlkJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICBzZWN1cmU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyZTogKHByb3h5LCBfb3B0aW9ucykgPT4ge1xuICAgICAgICAgIHByb3h5Lm9uKCdlcnJvcicsIChlcnIsIF9yZXEsIF9yZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1RDgzRFx1REVBOCBQcm94eSBlcnJvcjonLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHByb3h5Lm9uKCdwcm94eVJlcScsIChwcm94eVJlcSwgcmVxLCBfcmVzKSA9PiB7XG4gICAgICAgICAgICBwcm94eVJlcS5zZXRIZWFkZXIoJ09yaWdpbicsICdodHRwczovL3Nva2FzaXN0ZW0ucGl0Y2FyLmNvLmlkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSByZXEuaGVhZGVycy5jb29raWU7XG4gICAgICAgICAgICBpZiAoY29va2llcykge1xuICAgICAgICAgICAgICBwcm94eVJlcS5zZXRIZWFkZXIoJ0Nvb2tpZScsIGNvb2tpZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGQgdmVyc2lvbiBoZWFkZXJcbiAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcignWC1BcHAtVmVyc2lvbicsIHBrZy52ZXJzaW9uKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1RDgzRFx1RENFMSBQcm94eWluZyByZXF1ZXN0OicsIHtcbiAgICAgICAgICAgICAgdXJsOiByZXEudXJsLFxuICAgICAgICAgICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwcm94eS5vbigncHJveHlSZXMnLCAocHJveHlSZXMsIHJlcSwgX3JlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1x1MjcwNSBSZXNwb25zZSByZWNlaXZlZDonLCB7XG4gICAgICAgICAgICAgIHVybDogcmVxLnVybCxcbiAgICAgICAgICAgICAgc3RhdHVzOiBwcm94eVJlcy5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGhvc3Q6IHRydWVcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS0ke3NhZmVWZXJzaW9ufS0ke3RpbWVzdGFtcH0uW2hhc2hdLmpzYCxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLSR7c2FmZVZlcnNpb259LSR7dGltZXN0YW1wfS5baGFzaF0uanNgLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0tJHtzYWZlVmVyc2lvbn0tJHt0aW1lc3RhbXB9LltoYXNoXS5bZXh0XWBcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIEFkZCB0aGVzZSBvcHRpb25zXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAgLy8gUmVtb3ZlIGNvbnNvbGUubG9ncyBpbiBwcm9kdWN0aW9uXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KSIsICJ7XG4gIFwibmFtZVwiOiBcInBpdGNhci1tYXJrZXRpbmdcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjIuNy4yM1wiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBoZWFkbGVzc3VpL3Z1ZVwiOiBcIl4xLjcuMjNcIixcbiAgICBcIkBoZXJvaWNvbnMvdnVlXCI6IFwiXjIuMi4wXCIsXG4gICAgXCJAdGlwdGFwL2V4dGVuc2lvbi1tZW50aW9uXCI6IFwiXjIuMTEuN1wiLFxuICAgIFwiQHRpcHRhcC9leHRlbnNpb24tcGxhY2Vob2xkZXJcIjogXCJeMi4xMS43XCIsXG4gICAgXCJAdGlwdGFwL3N0YXJ0ZXIta2l0XCI6IFwiXjIuMTEuN1wiLFxuICAgIFwiQHRpcHRhcC92dWUtM1wiOiBcIl4yLjExLjdcIixcbiAgICBcIkB2dWV1cC92dWUtcXVpbGxcIjogXCJeMS4yLjBcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMy4wLjBcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy44XCIsXG4gICAgXCJjaGFydC5qc1wiOiBcIl40LjQuNlwiLFxuICAgIFwiZGF0ZS1mbnNcIjogXCJeNC4xLjBcIixcbiAgICBcImRvbXB1cmlmeVwiOiBcIl4zLjIuNFwiLFxuICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcImx1Y2lkZS12dWUtbmV4dFwiOiBcIl4wLjQ3NS4wXCIsXG4gICAgXCJtYXJrZWRcIjogXCJeMTUuMC43XCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjIuNlwiLFxuICAgIFwidml0ZS1wbHVnaW4tcHdhXCI6IFwiXjAuMjEuMFwiLFxuICAgIFwidnVlXCI6IFwiXjMuNS4xM1wiLFxuICAgIFwidnVlLWNoYXJ0anNcIjogXCJeNS4zLjJcIixcbiAgICBcInZ1ZS1xdWlsbFwiOiBcIl4xLjUuMVwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjUuMFwiLFxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMi4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuNDlcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4xNVwiLFxuICAgIFwidml0ZVwiOiBcIl41LjQuMTBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlSLFNBQVMsb0JBQW9CO0FBQzlTLE9BQU8sU0FBUzs7O0FDRGhCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFr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
