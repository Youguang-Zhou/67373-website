module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
			height: { inherit: 'inherit' },
			transitionProperty: { width: 'width' },
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
