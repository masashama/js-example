const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.build.js'
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({template: './src/index.html'})
	],
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader/url', 'file-loader']
			}
		]
	}
}