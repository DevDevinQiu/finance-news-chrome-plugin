// vite.config.ts
import { defineConfig } from "file:///D:/MenusifuStore/finance-news-chrome-plugin/.yarn/__virtual__/vite-virtual-70c27ef792/4/C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/vite-npm-5.4.21-12a8265f9b-10c0.zip/node_modules/vite/dist/node/index.js";
import react from "file:///D:/MenusifuStore/finance-news-chrome-plugin/.yarn/__virtual__/@vitejs-plugin-react-virtual-0bf8382707/4/C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-npm-4.7.0-650e714693-10c0.zip/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///C:/Users/Administrator/AppData/Local/Yarn/Berry/cache/@crxjs-vite-plugin-npm-2.3.0-b1d4b60db6-10c0.zip/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({
      contentScripts: {
        js: ["src/content-script/index.tsx"],
        css: ["src/content-script/panel.css"]
      },
      background: {
        serviceWorker: "src/background/index.ts",
        type: "module"
      },
      popup: "src/popup/index.html",
      optionsPage: "src/options/index.html"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNZW51c2lmdVN0b3JlXFxcXGZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNZW51c2lmdVN0b3JlXFxcXGZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NZW51c2lmdVN0b3JlL2ZpbmFuY2UtbmV3cy1jaHJvbWUtcGx1Z2luL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcngoe1xyXG4gICAgICBjb250ZW50U2NyaXB0czoge1xyXG4gICAgICAgIGpzOiBbJ3NyYy9jb250ZW50LXNjcmlwdC9pbmRleC50c3gnXSxcclxuICAgICAgICBjc3M6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L3BhbmVsLmNzcyddXHJcbiAgICAgIH0sXHJcbiAgICAgIGJhY2tncm91bmQ6IHtcclxuICAgICAgICBzZXJ2aWNlV29ya2VyOiAnc3JjL2JhY2tncm91bmQvaW5kZXgudHMnLFxyXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnXHJcbiAgICAgIH0sXHJcbiAgICAgIHBvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxyXG4gICAgICBvcHRpb25zUGFnZTogJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnXHJcbiAgICB9KVxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgZW1wdHlPdXREaXI6IHRydWVcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsU0FBUyxvQkFBb0I7QUFDdFYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsV0FBVztBQUVwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixnQkFBZ0I7QUFBQSxRQUNkLElBQUksQ0FBQyw4QkFBOEI7QUFBQSxRQUNuQyxLQUFLLENBQUMsOEJBQThCO0FBQUEsTUFDdEM7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLGVBQWU7QUFBQSxRQUNmLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLEVBQ2Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
