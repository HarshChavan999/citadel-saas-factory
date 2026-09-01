import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#070a11",
          900: "#0d1322",
          850: "#131b2e",
          800: "#1b253b",
          750: "#24324d",
          700: "#314366",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          900: "#164e63",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        rose: {
          400: "#f87171",
          500: "#ef4444",
        },
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        purple: {
          400: "#c084fc",
          500: "#a855f7",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(34, 211, 238, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

