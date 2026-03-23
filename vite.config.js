import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    base: process.env.GITHUB_ACTIONS ? '/o9ds/' : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    /* ── Library build (npm run build:lib) ── */
    ...(isLib && {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),
          name: 'o9ds',
          formats: ['es', 'cjs'],
          fileName: (format) => `o9ds.${format}.js`,
        },
        rollupOptions: {
          /* Don't bundle React — consumers provide their own */
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react-router-dom',
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        cssCodeSplit: false,
        outDir: 'dist',
      },
    }),
  };
});
