module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'portnox-primary': '#2BD25B',
        'portnox-secondary': '#1B67B2',
        'portnox-dark': '#1A2A3A',
        'portnox-light': '#F7F9FC',
        'cisco-blue': '#1BA0D7',
        'aruba-orange': '#FF8300',
        'forescout-blue': '#0076CE',
        'fortinet-red': '#EE3124',
        'juniper-teal': '#84BE3F',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}
