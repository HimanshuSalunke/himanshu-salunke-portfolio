import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
// import rehypeShiki from 'rehype-shiki' // TODO: Fix type declarations
// import { shiki } from 'shiki' // TODO: Use shiki for syntax highlighting

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('webp')) {
          return new URLSearchParams({
            format: 'webp',
            quality: '80',
          })
        }
        if (url.searchParams.has('avif')) {
          return new URLSearchParams({
            format: 'avif',
            quality: '80',
          })
        }
        return new URLSearchParams()
      },
    }),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      // TODO: Re-enable rehypeShiki when type declarations are fixed
      // rehypePlugins: [
      //   [
      //     rehypeShiki,
      //     {
      //       themes: {
      //         light: 'github-light',
      //         dark: 'github-dark',
      //       },
      //       transformers: [
      //         {
      //           name: 'copy-to-clipboard',
      //           code(node: any) {
      //             node.properties['data-copy'] = 'true'
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      external: ['canvas', 'fs', 'path'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['framer-motion'],
    exclude: ['framer-motion/dom']
  },
  assetsInclude: ['**/*.wasm'],
})
