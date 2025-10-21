/**
 * Design Tokens - Invest with Billionaires
 * JavaScript/TypeScript export for use in React, styled-components, etc.
 *
 * Usage:
 * import { colors, spacing, typography } from './design-tokens';
 * const Button = styled.button`
 *   background: ${colors.primary};
 *   padding: ${spacing.md};
 * `;
 */

export const colors = {
  // Primary (Sage Green)
  primary: '#9BBC0F',
  primaryLight: '#B3D12F',
  primaryDark: '#7A9608',
  primaryRgb: '155, 188, 15',

  // Accent (Warm Amber)
  accent: '#FFB30F',
  accentLight: '#FFBF3F',
  accentDark: '#E69F00',
  accentRgb: '255, 179, 15',

  // Background (Cream/Paper)
  bgPrimary: '#F7F3E9',
  bgSecondary: '#F0ECE3',
  bgTertiary: '#E8E4DA',

  // Text
  textPrimary: '#2A2823',
  textSecondary: '#6B6860',
  textTertiary: '#8B8680',
  textInverse: '#F7F3E9',

  // Grays
  gray50: '#F9F7F3',
  gray100: '#EFEBE1',
  gray200: '#E3DFCE',
  gray300: '#C9C4B3',
  gray400: '#8B8680',
  gray500: '#6B6860',
  gray600: '#4A4843',
  gray700: '#3A3833',
  gray800: '#2A2823',
  gray900: '#1A1813',

  // Semantic
  success: '#9BBC0F',
  warning: '#FFB30F',
  danger: '#C13B3B',
  info: '#7A8C8E',

  // Borders
  borderPrimary: '#8B8680',
  borderSecondary: '#C9C4B3',
  borderFocus: '#FFB30F',
};

export const typography = {
  // Font Families
  fontPrimary: "'Berkeley Mono', 'IBM Plex Mono', 'Courier New', monospace",
  fontNumbers: "'IBM Plex Mono', 'Courier New', monospace",
  fontFallback: "'Courier New', monospace",

  // Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '3rem',    // 48px
    '5xl': '4.5rem',  // 72px
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.4,
    normal: 1.6,
    relaxed: 1.8,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
    wider: '0.02em',
  },
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px

  // Component-Specific
  cardPadding: '1.5rem',
  sectionGap: '3rem',
  pageMargin: '1rem',
};

export const layout = {
  containerMax: '1400px',
  contentMax: '800px',
  cardMax: '440px',

  gridGutter: {
    mobile: '1rem',
    desktop: '1.5rem',
  },
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px rgba(42, 40, 35, 0.05)',
  md: '0 2px 4px rgba(42, 40, 35, 0.08), 0 4px 8px rgba(42, 40, 35, 0.04)',
  lg: '0 4px 8px rgba(42, 40, 35, 0.1), 0 8px 16px rgba(42, 40, 35, 0.06)',
  xl: '0 8px 16px rgba(42, 40, 35, 0.12), 0 16px 32px rgba(42, 40, 35, 0.08)',

  // LED Glow Effects
  glowPrimary: '0 0 8px rgba(155, 188, 15, 0.3), 0 0 16px rgba(155, 188, 15, 0.1)',
  glowAccent: '0 0 8px rgba(255, 179, 15, 0.3), 0 0 16px rgba(255, 179, 15, 0.1)',
};

export const transitions = {
  // Durations
  duration: {
    fast: '100ms',
    normal: '150ms',
    slow: '200ms',
    slower: '300ms',
    pulse: '500ms',
  },

  // Easing Functions
  easing: {
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
  },
};

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  toast: 600,
  tooltip: 700,
};

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',

  // Media query helpers
  media: {
    mobile: '@media (min-width: 320px)',
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    wide: '@media (min-width: 1440px)',
  },
};

export const components = {
  // Buttons
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    paddingX: '1rem',
    paddingY: '0.5rem',
    radius: '8px',
  },

  // Inputs
  input: {
    height: '48px',
    paddingX: '1rem',
    paddingY: '0.5rem',
    radius: '4px',
    borderWidth: '1px',
  },

  // Cards
  card: {
    padding: '1.5rem',
    radius: '8px',
    borderWidth: '1px',
  },

  // Icons
  icon: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  },

  // Accessibility
  touchTargetMin: '44px',
  focusOutlineWidth: '2px',
  focusOutlineOffset: '2px',
};

// Complete theme object (for styled-components ThemeProvider, etc.)
export const theme = {
  colors,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
};

export default theme;
