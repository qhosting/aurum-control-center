/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber': {
          'dark': '#0a0a0a',
          'darker': '#050505',
          'gold': '#FFD700',
          'amber': '#FFBF00',
          'cyan': '#00FFFF',
          'blue': '#0080FF',
          'gray': {
            '900': '#111111',
            '800': '#1a1a1a',
            '700': '#262626',
            '600': '#404040',
          }
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        'tech': ['Orbitron', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700' },
          '100%': { boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFBF00 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #00FFFF 0%, #0080FF 100%)',
      },
    },
  },
  plugins: [],
}