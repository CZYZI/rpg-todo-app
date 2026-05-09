import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/rpg-todo-app/', // GitHub Pages 部署路径
  server: {
    port: 3000,
    open: true,
  },
});
