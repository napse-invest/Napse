/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const FlipPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.flip-y-180': {
      transform: 'rotateY(180deg)'
    },
    '.flip-x-180': {
      transform: 'rotateX(180deg)'
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d'
    },
    '.perspective': {
      perspective: '1000px'
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden'
    }
  })
})


const MiscellaneousPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.icon-md': {
      transform: 'scale(1.8)'
    },
  })
})


module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}' // Tremor module
  ],
  darkMode: ['class'],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // light mode
        tremor: {
          brand: {
            faint: 'hsl(var(--secondary))',
            muted: 'hsl(var(--muted))',
            subtle: 'hsl(var(--secondary))',
            DEFAULT: 'hsl(var(--primary))',
            emphasis: 'hsl(var(--accent))',
            inverted: 'hsl(var(--background))' // white
          },
          background: {
            muted: 'hsl(var(--background))',
            subtle: 'hsl(var(--background))', 
            DEFAULT: 'hsl(var(--background))',
            emphasis: 'hsl(var(--background))'
          },
          border: {
            DEFAULT: 'hsl(var(--border))'
          },
          ring: {
            DEFAULT: 'hsl(var(--border))',
          },
          content: {
            subtle: 'hsl(var(--muted-foreground))', 
            DEFAULT: 'hsl(var(--foreground))',
            emphasis: 'hsl(var(--secondary-foreground))',
            strong: 'hsl(var(--foreground))',
            inverted: '#ffffff' // white
          }
        },
        // dark mode
        'dark-tremor': {
          brand: {
            faint: 'hsl(var(--secondary))',
            muted: 'hsl(var(--border))',
            subtle: 'hsl(var(--secondary))',
            DEFAULT: 'hsl(var(--primary))',
            emphasis: 'hsl(var(--accent))',
            inverted: 'hsl(var(--background))' // white
          },
          background: {
            muted: 'hsl(var(--background))',
            subtle: 'hsl(var(--background))', 
            DEFAULT: 'hsl(var(--background))',
            emphasis: 'hsl(var(--background))'
          },
          border: {
            DEFAULT: 'hsl(var(--border))',
          },
          ring: {
            DEFAULT: 'hsl(var(--border))',
          },
          content: {  // Used by graph
            subtle: 'hsl(var(--muted-foreground))', 
            DEFAULT: 'hsl(var(--foreground))',
            emphasis: 'hsl(var(--secondary-foreground))',
            strong: 'hsl(var(--foreground))',
            inverted: 'hsl(var(--border))'
          }
        }
      },
      boxShadow: {
        // light
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        // dark
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      fontSize: {
        'tremor-label': ['0.75rem'],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected']
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    }
  ],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('tailwindcss-animate'),
    FlipPlugin,
    MiscellaneousPlugin
  ]
}
