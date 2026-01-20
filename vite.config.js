import { defineConfig } from 'vite';
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        task_manager: resolve(__dirname, 'games/task_manager/index.html'),
        the_deadliner: resolve(__dirname, 'games/the_deadliner/index.html'),
        site_inspectore: resolve(__dirname, 'games/site_inspector/index.html'),
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
});
