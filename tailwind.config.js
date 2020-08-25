module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  theme: {
    fontFamily: {
      // 'sans': ['Arial', 'sans-serif'],
      // 'serif': ['serif'],
      // 'mono': ['OS Mono', 'monospace'],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 600,
    },
    extend: {
      colors: {
        'gray-50': '#A1A8C2',
        'gray-100': '#9292C1',
        'gray-200': '#5A5A89',
        'gray-300': '#14142B',
        'gray-400': '#0D0D1E',
        'gray-500': '#05050F',
        'blue': '#007DF1',
        'teal': '#00F1E7',
        'purple': '#7517F8',
        'pink': '#E323FF',
        'lime': '#8AFF6C',
        'green': '#02C751',
        'yellow': '#FFB524',
        'orange': '#FF5924',
        'red': '#F52C38',
        'white ': '#FFFFFF',
        'black ': '#000000',
      },
      opacity: {
        '85': '0.85',
      }
    }
  }
}
