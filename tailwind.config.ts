import type { Config } from "tailwindcss"

export const TOPBAR_HEIGHT = '75px'
export const SIDEBAR_WIDTH = '480px'

const heights = {
  topbar: TOPBAR_HEIGHT,
  page: `calc(100vh - ${TOPBAR_HEIGHT})`,
}
const widths = {
  page: `calc(100vw - ${SIDEBAR_WIDTH})`,
  sidebar: SIDEBAR_WIDTH,
  paragraph: '600px'
}

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        ...widths
      },
      spacing: {
        ...widths,
        ...heights,
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: '48px',
        '2xl': '96px',
        '3xl': '192px',
      },
      height: {
        ...heights
      },
      colors: {
        border: "var(--border)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: 
          "var(--background)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          
        },
        "fade-in": {
          "0%": {
            opacity: '0'
          },
          "100%": {
            opacity: '1'
          },
        },
        "fade-out": {
          "0%": {
            opacity: '1'
          },
          "100%": {
            opacity: '0'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-out": "fade-out 0.7s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config