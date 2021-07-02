module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: '#174080', // 2代logo蓝色
				whitesmoke: 'whitesmoke',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
}
