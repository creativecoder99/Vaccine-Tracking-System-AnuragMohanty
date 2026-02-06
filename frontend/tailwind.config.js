/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9", // Medical Blue (Sky 500)
        secondary: "#0284C7", // Darker Blue (Sky 600)
        accent: "#14B8A6", // Teal (Teal 500)
        background: "#F8FAFC", // Slate 50
        surface: "#FFFFFF",
        textPrimary: "#1E293B", // Slate 800
        textSecondary: "#64748B", // Slate 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
