import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: {
        manifest_version: 3,
        name: 'Finance News Chrome Extension (Simplified)',
        version: '2.0.0',
        description: 'Chrome extension for aggregating financial and political news (Simplified - No AI)',
        permissions: ['storage', 'alarms'],
        host_permissions: ['https://*/*', 'http://*/*'],
        background: {
          service_worker: 'src/background/index.ts',
          type: 'module'
        },
        content_scripts: [
          {
            matches: ['<all_urls>'],
            js: ['src/content-script/index.tsx']
          }
        ],
        action: {
          default_popup: 'src/popup/index.html',
          default_icon: {
            16: 'icons/icon16.png',
            48: 'icons/icon48.png',
            128: 'icons/icon128.png'
          }
        },
        options_page: 'src/options/index.html',
        icons: {
          16: 'icons/icon16.png',
          48: 'icons/icon48.png',
          128: 'icons/icon128.png'
        }
      }
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
