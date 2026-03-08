// vite.config.ts
import { defineConfig } from "file:///D:/MenusifuStore/finance-news-chrome-plugin/.yarn/__virtual__/vite-virtual-70c27ef792/4/C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/vite-npm-5.4.21-12a8265f9b-10c0.zip/node_modules/vite/dist/node/index.js";
import react from "file:///D:/MenusifuStore/finance-news-chrome-plugin/.yarn/__virtual__/@vitejs-plugin-react-virtual-0bf8382707/4/C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-npm-4.7.0-650e714693-10c0.zip/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/@crxjs-vite-plugin-npm-2.3.0-b1d4b60db6-10c0.zip/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({
      manifest: {
        name: "Finance News Chrome Extension (Simplified)",
        version: "2.0.0",
        description: "Chrome extension for aggregating financial and political news (Simplified - No AI)",
        permissions: ["storage", "alarms"],
        host_permissions: ["https://*/*", "http://*/*"],
        background: {
          service_worker: "src/background/index.ts",
          type: "module"
        },
        content_scripts: [
          {
            matches: ["<all_urls>"],
            js: ["src/content-script/index.tsx"],
            css: ["src/content-script/panel.css"]
          }
        ],
        action: {
          default_popup: "src/popup/index.html",
          default_icon: {
            16: "icons/icon16.png",
            48: "icons/icon48.png",
            128: "icons/icon128.png"
          }
        },
        options_page: "src/options/index.html",
        icons: {
          16: "icons/icon16.png",
          48: "icons/icon48.png",
          128: "icons/icon128.png"
        }
      }
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNZW51c2lmdVN0b3JlXFxcXGZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNZW51c2lmdVN0b3JlXFxcXGZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NZW51c2lmdVN0b3JlL2ZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoe1xyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdGaW5hbmNlIE5ld3MgQ2hyb21lIEV4dGVuc2lvbiAoU2ltcGxpZmllZCknLFxyXG4gICAgICAgIHZlcnNpb246ICcyLjAuMCcsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdDaHJvbWUgZXh0ZW5zaW9uIGZvciBhZ2dyZWdhdGluZyBmaW5hbmNpYWwgYW5kIHBvbGl0aWNhbCBuZXdzIChTaW1wbGlmaWVkIC0gTm8gQUkpJyxcclxuICAgICAgICBwZXJtaXNzaW9uczogWydzdG9yYWdlJywgJ2FsYXJtcyddLFxyXG4gICAgICAgIGhvc3RfcGVybWlzc2lvbnM6IFsnaHR0cHM6Ly8qLyonLCAnaHR0cDovLyovKiddLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IHtcclxuICAgICAgICAgIHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxyXG4gICAgICAgICAgdHlwZTogJ21vZHVsZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBtYXRjaGVzOiBbJzxhbGxfdXJscz4nXSxcclxuICAgICAgICAgICAganM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzeCddLFxyXG4gICAgICAgICAgICBjc3M6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L3BhbmVsLmNzcyddXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBhY3Rpb246IHtcclxuICAgICAgICAgIGRlZmF1bHRfcG9wdXA6ICdzcmMvcG9wdXAvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICBkZWZhdWx0X2ljb246IHtcclxuICAgICAgICAgICAgMTY6ICdpY29ucy9pY29uMTYucG5nJyxcclxuICAgICAgICAgICAgNDg6ICdpY29ucy9pY29uNDgucG5nJyxcclxuICAgICAgICAgICAgMTI4OiAnaWNvbnMvaWNvbjEyOC5wbmcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpb25zX3BhZ2U6ICdzcmMvb3B0aW9ucy9pbmRleC5odG1sJyxcclxuICAgICAgICBpY29uczoge1xyXG4gICAgICAgICAgMTY6ICdpY29ucy9pY29uMTYucG5nJyxcclxuICAgICAgICAgIDQ4OiAnaWNvbnMvaWNvbjQ4LnBuZycsXHJcbiAgICAgICAgICAxMjg6ICdpY29ucy9pY29uMTI4LnBuZydcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFTLG9CQUFvQjtBQUN0VixPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXO0FBRXBCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLGFBQWEsQ0FBQyxXQUFXLFFBQVE7QUFBQSxRQUNqQyxrQkFBa0IsQ0FBQyxlQUFlLFlBQVk7QUFBQSxRQUM5QyxZQUFZO0FBQUEsVUFDVixnQkFBZ0I7QUFBQSxVQUNoQixNQUFNO0FBQUEsUUFDUjtBQUFBLFFBQ0EsaUJBQWlCO0FBQUEsVUFDZjtBQUFBLFlBQ0UsU0FBUyxDQUFDLFlBQVk7QUFBQSxZQUN0QixJQUFJLENBQUMsOEJBQThCO0FBQUEsWUFDbkMsS0FBSyxDQUFDLDhCQUE4QjtBQUFBLFVBQ3RDO0FBQUEsUUFDRjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sZUFBZTtBQUFBLFVBQ2YsY0FBYztBQUFBLFlBQ1osSUFBSTtBQUFBLFlBQ0osSUFBSTtBQUFBLFlBQ0osS0FBSztBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxPQUFPO0FBQUEsVUFDTCxJQUFJO0FBQUEsVUFDSixJQUFJO0FBQUEsVUFDSixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
