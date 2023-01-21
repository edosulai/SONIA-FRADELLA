const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                dark: {
                    'white': '#cdd9e5',
                    50: '#cdd9e5',
                    100: '#adbac7',
                    200: '#909dab',
                    300: '#768390',
                    400: '#636e7b',
                    500: '#545d68',
                    600: '#444c56',
                    700: '#373e47',
                    800: '#2d333b',
                    900: '#22272e',
                    'black': '#1c2128',
                },
                light: {
                    'white': '#ffffff',
                    50: '#f6f8fa',
                    100: '#eaeef2',
                    200: '#d0d7de',
                    300: '#afb8c1',
                    400: '#8c959f',
                    500: '#6e7781',
                    600: '#57606a',
                    700: '#424a53',
                    800: '#32383f',
                    900: '#24292f',
                    'black': '#1b1f24',
                },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
