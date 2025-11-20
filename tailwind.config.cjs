/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                royal: '#0A6CFF', // Primary Action Blue
                sky: '#E0F2FE',   // Very subtle background blue
                deep: '#04122B',  // Brand Dark Blue (Text/Footer)
                slate: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    800: '#1E293B',
                    900: '#0F172A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            animation: {
                'float': 'float 8s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                }
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 20px rgba(10, 108, 255, 0.15)',
            }
        },
    },
    plugins: [],
}
