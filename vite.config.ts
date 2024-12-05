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
        opfs: resolve(root, 'opfs', 'index.html'),
        index: resolve(root, 'index.html'),
        anchorPosition: resolve(root, 'anchor-position', 'index.html'),
        scrollDriven: resolve(root, 'scroll-driven', 'index.html'),
        schedulerYield: resolve(root, 'scheduler-yield', 'index.html'),
        selectlist: resolve(root, 'selectlist', 'index.html'),
        webDriverBidi: resolve(root, 'web-driver-bidi', 'index.html'),
      },
    },
  },
})
