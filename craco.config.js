/* eslint-disable */
const CracoLessPlugin = require('craco-less')

module.exports = {
	/**
	 * 因为这个文件夹是放在iCloud里的，为了避免同步node_modules，执行了：
	 * 		mkdir node_modules.nosync && ln -s node_modules.nosync node_modules
	 * 的命令，创建了node_modules.nosync的软连接
	 */
	webpack: process.env.NODE_ENV === 'development' && {
		configure: (webpackConfig) => {
			const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
				({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
			)
			webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
			return webpackConfig
		},
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': 'orange' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
