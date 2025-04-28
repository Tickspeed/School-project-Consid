// tailwind.config.mjs (or .cjs, .js)
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}' // Default pattern - verify it covers your component location
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }