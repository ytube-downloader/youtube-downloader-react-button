import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        body: "#f3f4f6",
        header_bg: "#FFFFFE",
        purple_main: "#6c5ce7",
        heading_main: "#2D3436",
        dark_heading_main: "#FFFFFF",
        base_one: "#4A5455",
        dark_base_one: "#b8b8b8",
        dark_body: "#121316",
        dark_heading: "#191a1d",
        partner: "#9ca3af",
        
        // Enhanced color palette
        purple: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          main: "#6c5ce7"
        },
        
        // Status colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d"
        },
        
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c"
        },
        
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309"
        },
        
        // Neutral grays with better contrast
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717"
        }
      },
      
      fontFamily: {
        league_spartan: ["var(--font-league_spartan_sans)"],
        inter: ["var(--font-inter)"],
      },
      
      // Enhanced spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      // Enhanced border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      
      // Enhanced shadows
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 25px 0 rgba(0, 0, 0, 0.1)',
        'hard': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
        'colored': '0 4px 25px 0 rgba(108, 92, 231, 0.15)',
        'colored-lg': '0 10px 40px 0 rgba(108, 92, 231, 0.2)'
      },
      
      // Enhanced animations
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'slideIn': 'slideIn 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.2s ease-out forwards',
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'pulse-gentle': 'pulse-gentle 2s infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      
      keyframes: {
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideIn: {
          'from': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        'pulse-gentle': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        xs: '2px'
      },
      
      // Enhanced z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    // Add line-clamp plugin for text truncation
    require('@tailwindcss/line-clamp'),
  ],
};

export default config;