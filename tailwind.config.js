/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tw-elements/plugin.cjs"),
    require('@tailwindcss/typography'),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require('@tailwindcss/container-queries')
    require("tailwindcss-rtl"),
  ],
};
