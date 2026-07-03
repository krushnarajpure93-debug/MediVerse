/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ===== Navbar ===== */
        navbar: "#111827",
        navText: "#FFFFFF",
        navHover: "#1F2937",
        brand: "#FACC15",
        emergency: "#DC2626",

        /* ===== Brand ===== */
        brand: {
          primary: "#FACC15", // main CTA, highlights
          secondary: "#111827", // navbar, footer, headings
          accent: "#DC2626", // emergency, danger
        },

        /* ===== Backgrounds ===== */
        bg: {
          page: "#F9FAFB", // main page bg
          section: "#FFFFFF", // cards, sections
          soft: "#F3F4F6", // subtle sections
          dark: "#0F172A", // dark sections
        },

        /* ===== Text ===== */
        text: {
          heading: "#111827", // H1–H6
          body: "#374151", // paragraph
          muted: "#6B7280", // helper text
          inverse: "#FFFFFF", // text on dark bg
          link: "#2563EB", // links
        },

        /* ===== Navigation ===== */
        nav: {
          bg: "#111827",
          text: "#E5E7EB",
          active: "#FACC15",
          hover: "#1F2933",
        },

        /* ===== Buttons ===== */
        btn: {
          primary: "#FACC15",
          primaryText: "#111827",
          secondary: "#111827",
          secondaryText: "#FFFFFF",
          danger: "#DC2626",
        },

        /* ===== Borders & Dividers ===== */
        border: {
          light: "#E5E7EB",
          normal: "#D1D5DB",
        },

        /* ===== Status ===== */
        status: {
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};
