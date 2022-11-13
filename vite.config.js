import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2021',
      supported: { bigint: true, 'top-level-await': true },
    },
  },
  build: {
    target: 'esnext',
  },
});
