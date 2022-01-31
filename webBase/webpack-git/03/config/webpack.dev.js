const common = require('./webpack.common.js')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
	devServer: {
		port: 8008,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:4567',
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
})
