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
        background: "var(--background)",
        foreground: "var(--foreground)",
        customgreen: "#6caa01",
        customdarkblue: "#01020f",
        customcyan: "#01aa6b",
        customdarkbtn: "#0c1f2a",
      },
    },
  },
  plugins: [],
};
