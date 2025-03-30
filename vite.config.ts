import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Import the React plugin
import tailwindcss from '@tailwindcss/vite' // Import the Tailwind CSS plugin

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
  ],
})