import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  // Load environment variables from the .env file
  const env = loadEnv(mode, process.cwd(), '');
  
  // Base URL for the application (could be useful for deployment)
  const API_URL = `${env.VITE_APP_BASE_NAME}` || '/'; // Use '/' if the base URL is not set
  const PORT = 3000; // Port for Vite development server

  return {
    server: {
      open: true, // Open the browser upon server start
      port: PORT, // Port for Vite development server
      host: '0.0.0.0', // Listen on all network interfaces
      proxy: {
        // Proxy settings to forward requests to the backend
        '/register': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/register/, '/register'),
        },
      },
    },
    define: {
      global: 'window', // Ensure compatibility with global object usage
    },
    resolve: {
      // Uncomment and adjust if aliasing is needed
      // alias: [
      //   {
      //     find: /^~(.+)/,
      //     replacement: path.join(process.cwd(), 'node_modules/$1')
      //   },
      //   {
      //     find: /^src(.+)/,
      //     replacement: path.join(process.cwd(), 'src/$1')
      //   }
      // ]
    },
    preview: {
      open: true, // Open the browser upon preview start
      port: PORT, // Port for Vite preview
    },
    base: API_URL, // Base URL for deployment
    plugins: [react(), jsconfigPaths()],
  };
});
