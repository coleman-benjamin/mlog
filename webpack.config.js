const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require("path");

module.exports = {
	entry: {
		"client": path.join(__dirname, "/client/main.js")
	},
	output: {
		path: path.join(__dirname, "/server/public/dist"),
		filename: "client.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
}