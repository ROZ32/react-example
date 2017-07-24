const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
// set all vendors
// const vendors = []

const PATHS = {
	app: path.resolve(__dirname, 'app'),
	build: path.join(__dirname, '/dist')
};

config = {
	entry: {
		main: PATHS.app
		// vendor: vendors
	},
	output: {
		path: PATHS.build,
		// publicPath: '/dist',
		filename: '[name].[hash].js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				include: PATHS.app,
				exclude: /node_modules/,
				use: 'jscs-loader'
			},
			{
				test: /\.css$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
					// publicPath: '/dist/'
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'sass-loader'])
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.html$/,
				include: PATHS.app,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: isProduction
					}
				}]
			},
			{
				test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|svg|ttf)$/i,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: './index.html',
			minify: {
				collapseWhiteSpace: true
			},
			template: './src/index_template.ejs'
		}),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: false,
			allChunks: true
		}),
		new CleanWebpackPlugin([PATHS.build], {
			root: process.cwd()
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		})
	],
	devServer: {
		contentBase: PATHS.build,
		compress: true,
		open: true,
		hot: true
	}
};

if (isProduction) {
	// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		// minimize: true,
		// compress: {
		// 	warnings: false
		// },
		// mangle: false,
		// output: { comments: false }

	// }));
};

module.exports = config;