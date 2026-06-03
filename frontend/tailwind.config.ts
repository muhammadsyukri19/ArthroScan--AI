import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "on-secondary-fixed-variant": "#004e5c",
          "inverse-primary": "#006c49",
          "surface-container-highest": "#2d3449",
          "on-tertiary": "#1f3700",
          "tertiary-fixed": "#acf847",
          "surface-container-low": "#131b2e",
          "tertiary-container": "#72b400",
          "on-primary": "#003824",
          "on-tertiary-container": "#254000",
          "error-container": "#93000a",
          "inverse-on-surface": "#283044",
          "inverse-surface": "#dae2fd",
          "on-secondary": "#003640",
          "outline-variant": "#3c4a42",
          "secondary": "#4cd7f6",
          "outline": "#86948a",
          "background": "#0b1326",
          "on-error": "#690005",
          "on-secondary-fixed": "#001f26",
          "secondary-fixed-dim": "#4cd7f6",
          "surface-tint": "#4edea3",
          "secondary-container": "#03b5d3",
          "on-primary-fixed": "#002113",
          "on-secondary-container": "#00424e",
          "on-tertiary-fixed-variant": "#304f00",
          "primary-container": "#10b981",
          "tertiary-fixed-dim": "#91db2a",
          "surface-dim": "#0b1326",
          "secondary-fixed": "#acedff",
          "on-surface-variant": "#bbcabf",
          "surface-variant": "#2d3449",
          "surface-container-high": "#222a3d",
          "on-primary-fixed-variant": "#005236",
          "surface-container": "#171f33",
          "on-error-container": "#ffdad6",
          "on-tertiary-fixed": "#102000",
          "on-background": "#dae2fd",
          "primary-fixed": "#6ffbbe",
          "surface": "#0b1326",
          "surface-container-lowest": "#060e20",
          "on-primary-container": "#00422b",
          "primary": "#4edea3",
          "error": "#ffb4ab",
          "tertiary": "#91db2a",
          "primary-fixed-dim": "#4edea3",
          "surface-bright": "#31394d",
          "on-surface": "#dae2fd"
      },
      "borderRadius": {
          "DEFAULT": "0.25rem",
          "lg": "0.5rem",
          "xl": "0.75rem",
          "full": "9999px"
      },
      "spacing": {
          "desktop-max": "1440px",
          "base": "8px",
          "gutter": "16px",
          "container-padding": "24px"
      },
      "fontFamily": {
          "label-md": ["Geist"],
          "body-lg": ["Inter"],
          "label-sm": ["Geist"],
          "display-lg": ["Inter"],
          "headline-md": ["Inter"],
          "headline-lg-mobile": ["Inter"],
          "headline-lg": ["Inter"],
          "body-md": ["Inter"]
      },
      "fontSize": {
          "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500" }],
          "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
          "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "500" }],
          "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
          "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
          "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
          "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
          "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};

export default config;