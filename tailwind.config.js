/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// colors: {
			// 	primary: {
			// 		1: "#ffcf40",
			// 		2: "#ffdc73"
			// 	}
			// },
			animation: {
				"single-spin": "spin 0.3s ease-in-out",
				"fade-in": " fadeIn 0.5s ease-in-out"
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "0.85" }
				}
			},
			fontFamily: {
				atalon: ["Atalon", "sans-serif"],
				typerwriter : ["JMH Typewriter", "sans-serif"],
				typewriterblack: ["JMH Typewriter Black", "sans-serif"],
			}
		}
	},
	plugins: []
}
