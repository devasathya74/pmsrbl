/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: '#1e3a8a', // गहरा नीला (पुलिस थीम)
                secondary: '#facc15', // पीला
                accent: '#3b82f6', // हल्का नीला
                soft: '#f3f4f6',
            },
            fontFamily: {
                sans: ['"Tiro Devanagari Hindi"', 'sans-serif'], // हिंदी फॉन्ट
                heading: ['"Tiro Devanagari Hindi"', 'sans-serif'],
                hand: ['"Kalam"', 'cursive'],
            }
        }
    },
    plugins: [],
}
