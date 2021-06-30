/* eslint-disable */
const CracoLessPlugin = require('craco-less')

module.exports = {
	style: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#174080' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
