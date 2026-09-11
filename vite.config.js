import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    server: {
    // port: 5007,
    strictPort: true,
    host: "0.0.0.0",
    },
    // proxy: {
    //   '/api': { target: 'http://69.62.84.113:5012/', changeOrigin: true },
    //   '/uploads': { target: 'http://69.62.84.113:5012/', changeOrigin: true }
    // }
  }
});
