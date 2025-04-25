export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
        fontFamily: {
            sans: [
            'Inter',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
        ],
        },
        animation: {
            'bounce': 'bounce 2s infinite',
        },
        transitionProperty: {
            'height': 'height',
        },
        },
    },
    plugins: [],
};