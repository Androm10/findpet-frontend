import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import macrosPlugin from 'vite-plugin-babel-macros';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), macrosPlugin()],
  resolve: {
    alias: [{ find: '@shared', replacement: '/src/shared' }],
  },
});
