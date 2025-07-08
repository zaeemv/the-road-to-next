const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-from-top": {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-from-top": "fade-in-from-top 0.5s ease-out",
      },
    },
  },
};

export default config;
