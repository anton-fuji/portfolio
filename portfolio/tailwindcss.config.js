/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        animation: {
            'bounce': 'bounce 1s infinite',
        },
        transitionProperty: {
            'height': 'height',
            'spacing': 'margin, padding',
        },
        keyframes: {
            bounce: {
            '0%, 100%': {
                transform: 'translateY(-25%)',
                animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
            },
            '50%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            },
            },
        },
        },
    },
    plugins: [],
};