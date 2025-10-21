/**
 * Tailwind CSS Configuration - Invest with Billionaires
 * Sophisticated Gameboy aesthetic with wabi-sabi authenticity
 *
 * Usage: Extend your tailwind.config.js with this configuration
 * or use this as your complete config file
 */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],

  theme: {
    extend: {
      // ========================================
      // COLORS
      // ========================================
      colors: {
        primary: {
          DEFAULT: '#9BBC0F',
          light: '#B3D12F',
          dark: '#7A9608',
        },
        accent: {
          DEFAULT: '#FFB30F',
          light: '#FFBF3F',
          dark: '#E69F00',
        },
        bg: {
          primary: '#F7F3E9',
          secondary: '#F0ECE3',
          tertiary: '#E8E4DA',
        },
        text: {
          primary: '#2A2823',
          secondary: '#6B6860',
          tertiary: '#8B8680',
          inverse: '#F7F3E9',
        },
        gray: {
          50: '#F9F7F3',
          100: '#EFEBE1',
          200: '#E3DFCE',
          300: '#C9C4B3',
          400: '#8B8680',
          500: '#6B6860',
          600: '#4A4843',
          700: '#3A3833',
          800: '#2A2823',
          900: '#1A1813',
        },
        success: '#9BBC0F',
        warning: '#FFB30F',
        danger: '#C13B3B',
        info: '#7A8C8E',
        border: {
          DEFAULT: '#8B8680',
          light: '#C9C4B3',
          focus: '#FFB30F',
        },
      },

      // ========================================
      // TYPOGRAPHY
      // ========================================
      fontFamily: {
        primary: ['Berkeley Mono', 'IBM Plex Mono', 'Courier New', 'monospace'],
        numbers: ['IBM Plex Mono', 'Courier New', 'monospace'],
        mono: ['Courier New', 'monospace'],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.4' }],    // 12px
        sm: ['0.875rem', { lineHeight: '1.5' }],   // 14px
        base: ['1rem', { lineHeight: '1.6' }],     // 16px
        lg: ['1.125rem', { lineHeight: '1.6' }],   // 18px
        xl: ['1.25rem', { lineHeight: '1.4' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],  // 24px
        '3xl': ['2rem', { lineHeight: '1.3' }],    // 32px
        '4xl': ['3rem', { lineHeight: '1.2' }],    // 48px
        '5xl': ['4.5rem', { lineHeight: '1.2' }],  // 72px
      },

      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
      },

      // ========================================
      // SPACING (8px base unit grid)
      // ========================================
      spacing: {
        xs: '0.25rem',   // 4px
        sm: '0.5rem',    // 8px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        '2xl': '3rem',   // 48px
        '3xl': '4rem',   // 64px
        '4xl': '6rem',   // 96px
      },

      // ========================================
      // LAYOUT
      // ========================================
      maxWidth: {
        container: '1400px',
        content: '800px',
        card: '440px',
      },

      // ========================================
      // BORDER RADIUS
      // ========================================
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },

      // ========================================
      // BOX SHADOWS
      // ========================================
      boxShadow: {
        sm: '0 1px 2px rgba(42, 40, 35, 0.05)',
        DEFAULT: '0 2px 4px rgba(42, 40, 35, 0.08), 0 4px 8px rgba(42, 40, 35, 0.04)',
        md: '0 2px 4px rgba(42, 40, 35, 0.08), 0 4px 8px rgba(42, 40, 35, 0.04)',
        lg: '0 4px 8px rgba(42, 40, 35, 0.1), 0 8px 16px rgba(42, 40, 35, 0.06)',
        xl: '0 8px 16px rgba(42, 40, 35, 0.12), 0 16px 32px rgba(42, 40, 35, 0.08)',

        // LED Glow Effects
        'glow-primary': '0 0 8px rgba(155, 188, 15, 0.3), 0 0 16px rgba(155, 188, 15, 0.1)',
        'glow-accent': '0 0 8px rgba(255, 179, 15, 0.3), 0 0 16px rgba(255, 179, 15, 0.1)',
      },

      // ========================================
      // TRANSITIONS
      // ========================================
      transitionDuration: {
        fast: '100ms',
        DEFAULT: '150ms',
        slow: '200ms',
        slower: '300ms',
        pulse: '500ms',
      },

      transitionTimingFunction: {
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ========================================
      // Z-INDEX
      // ========================================
      zIndex: {
        base: '0',
        dropdown: '100',
        sticky: '200',
        fixed: '300',
        'modal-backdrop': '400',
        modal: '500',
        toast: '600',
        tooltip: '700',
      },

      // ========================================
      // ANIMATION
      // ========================================
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-in': 'slideIn 200ms ease-out',
        'shake': 'shake 400ms ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
      },

      // ========================================
      // SCREENS (Breakpoints)
      // ========================================
      screens: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1440px',
      },
    },
  },

  // ========================================
  // PLUGINS
  // ========================================
  plugins: [
    // Add Tailwind plugins here if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),

    // Custom utility plugins
    function({ addUtilities }) {
      const newUtilities = {
        // LED Glow Effect
        '.led-glow': {
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          textShadow: '0 0 8px rgba(155, 188, 15, 0.3), 0 0 16px rgba(155, 188, 15, 0.1)',
          color: '#9BBC0F',
        },
        '.led-glow-accent': {
          fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
          textShadow: '0 0 8px rgba(255, 179, 15, 0.3), 0 0 16px rgba(255, 179, 15, 0.1)',
          color: '#FFB30F',
        },

        // Pixel Art Rendering
        '.pixel-art': {
          imageRendering: 'pixelated',
          imageRendering: '-moz-crisp-edges',
          imageRendering: 'crisp-edges',
        },

        // Paper Texture Background
        '.bg-paper': {
          backgroundColor: '#F7F3E9',
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" opacity=\"0.03\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\"/></svg>')",
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
