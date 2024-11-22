module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
   extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      'muted-foreground': 'hsl(var(--muted-foreground))',
      border: 'hsl(var(--border))',
    },
    fontFamily: {
      sans: ['var(--font-sans)', 'sans-serif'],
    },
   },
  },
  plugins: [
     require("tailwindcss-animate"),
      require('tailwindcss'),
      require('autoprefixer'),
  ]
}
