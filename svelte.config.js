import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Use the static adapter for building a static site
    adapter: adapter({
      // where to put the generated files (default 'build')
      pages: 'build',
      assets: 'build',
      fallback: null   // or 'index.html' if you need SPA-like routing
    }),
    alias: {
      $lib: './src/lib'
    }
  },
  preprocess: [
    vitePreprocess(),
    preprocess({
      typescript: true,
    }),
  ]
};

export default config;
