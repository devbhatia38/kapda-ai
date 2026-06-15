/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D1B69", // Midnight Purple
        accent: "#B76E79",  // Rose Gold
        background: "#FFF8F0", // Cream White
        foreground: "#1A1A2E", // Deep Charcoal
      },
    },
  },
  plugins: [],
};
