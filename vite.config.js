import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2021',
      supported: { bigint: true },
    },
  },
  build: {
    target: 'esnext',
  },
});
