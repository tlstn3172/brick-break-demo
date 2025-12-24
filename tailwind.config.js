/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,html}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#0db9f2',
                'background-light': '#f5f8f8',
                'background-dark': '#101e22',
                'accent-purple': '#a855f7',
                'accent-teal': '#2dd4bf',
            },
            fontFamily: {
                'display': ['Spline Sans', 'sans-serif']
            },
            borderRadius: {
                'DEFAULT': '1rem',
                'lg': '2rem',
                'xl': '3rem',
            },
            boxShadow: {
                'glow-primary': '0 0 15px rgba(13, 185, 242, 0.6)',
                'glow-white': '0 0 15px rgba(255, 255, 255, 0.8)',
                'glow-purple': '0 0 10px rgba(168, 85, 247, 0.5)',
                'glow-teal': '0 0 10px rgba(45, 212, 191, 0.5)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
