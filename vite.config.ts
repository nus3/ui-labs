import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  base: '/ui-labs/',
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        pip: resolve(root, 'pip', 'index.html'),
        viewTransitionsAPI: resolve(root, 'view-transitions-api', 'index.html'),
        index: resolve(root, 'index.html'),
      },
    },
  },
})
