/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'radium': 'var(--radium)',
        'radium-glow': 'var(--radium-glow)',
        'depth-1': 'var(--depth-1)',
        'depth-2': 'var(--depth-2)',
        'depth-3': 'var(--depth-3)',
        'depth-4': 'var(--depth-4)',
        'accent-pink': 'var(--accent-pink)',
        'accent-pink-dark': 'var(--accent-pink-dark)',
        'accent-lime': 'var(--accent-lime)',
        'accent-purple': 'var(--accent-purple)',
        'accent-orange': 'var(--accent-orange)',
        'muted': 'var(--muted)',
        'muted-light': 'var(--muted-light)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
        'info': 'var(--info)',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        'mono-tight': ['Space Mono', 'monospace'],
        'mono-body': ['Space Mono', 'monospace'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
        disket: ['Disket Mono', 'monospace'],
      },
      spacing: {
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(0, 224, 255, 0.5)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(0, 224, 255, 0.8)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-radium': '0 0 20px rgba(0, 224, 255, 0.3)',
        'glow-radium-lg': '0 0 40px rgba(0, 224, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
