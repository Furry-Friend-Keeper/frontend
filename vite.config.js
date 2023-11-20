import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/keepers/all"
  plugins: [react()],

  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
