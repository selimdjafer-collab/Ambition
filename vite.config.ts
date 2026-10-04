/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Base relative pour un hébergement statique sous un sous-chemin (build démo).
  base: process.env.STATIC_DEMO_BUILD ? './' : '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
