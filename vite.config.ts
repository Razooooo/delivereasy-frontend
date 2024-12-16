import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    open: true, // Ouvrir le navigateur par défaut lors du démarrage du serveur
  },
});
