module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: '#174080', // 2代logo蓝色
				whitesmoke: 'whitesmoke',
				light: '#fafafafa',
				spotify: {
					300: '#242424',
					600: '#181818',
					900: '#121212',
				},
			},
			fontSize: {
				'vw-5': '5vw',
			},
			height: {
				'vw-15': '15vw',
			},
			transitionProperty: {
				width: 'width',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
}
