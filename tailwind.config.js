/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                white: "#FFFFFF",
                black: "#000000",
                onematter: {
                    100: "#fff7ed",
                    200: "#ffedd5",
                    300: "#fed7aa",
                    400: "#fdba74",
                    500: "#fb923c",
                    600: "#f97316",
                    700: "#ea580c",
                    800: "#c2410c",
                    900: "#9a3412",
                },
                neutral: {
                    100: "#f4f4f5",
                    200: "#e4e4e7",
                    300: "#d4d4d8",
                    400: "#a1a1aa",
                    500: "#71717a",
                    600: "#52525b",
                    700: "#3f3f46",
                    800: "#27272a",
                    900: "#18181b",
                },
            },
        },
    },
    plugins: [],
};
