const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	// 入口文件
	entry: './index.js',
	output: {
		path: resolve(__dirname, '../dist'),
		filename: "[name].js",
		// 清理打包目录
		clean: true
	},
	resolveLoader: {
		modules: ['node_modules', resolve(__dirname, '../loaders')]
	},
	// loader
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.md$/,
				use: 'md-loader'
			},
			{
				test: /\.png$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						output: './images',
						outputPath: './dist/images',
						limit: 20000
					}
				}
			}
		]
	},
	plugins: [
		// 实例化 注册插件
		new HtmlWebpackPlugin({
			filename: "index.html",
			// 以入口文件路径为基准
			template: "./public/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
}
