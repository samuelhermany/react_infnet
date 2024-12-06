import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import livereload from "vite-plugin-live-reload";

export default defineConfig(() => {
  return {
    server:{
      port: 3000,
    },
    build: {
      outDir: 'build',
      sourcemap: true, // Gera os source maps para depuração
    },
    plugins: [
        react(),
        livereload('src/**/*.{js,jsx,ts,tsx}')
    ],
  };
});