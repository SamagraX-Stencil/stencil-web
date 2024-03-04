import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfigExport } from 'vitest/config';



const config: UserConfigExport = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'], // Add this line
  },
};

export default defineConfig(config);
