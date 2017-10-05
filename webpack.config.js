const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

const isProduction = process.env.NODE_ENV === 'production';
// set all vendors
const bootstrapConfig = isProduction ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
// const vendors = [];

const PATHS = {
	app: path.resolve(__dirname, 'app'),
	build: path.join(__dirname, '/dist')
};

config = {
	entry: {
		main: PATHS.app,
		bootstrap: bootstrapConfig
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
				use: ['babel-loader', 'eslint-loader']
			},
			{
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                }),
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use : ['css-loader', 'postcss-loader', 'sass-loader']
				})
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
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether",
			Popper: 'popper.js',
			Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			Button: "exports-loader?Button!bootstrap/js/dist/button",
			Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: "exports-loader?Util!bootstrap/js/dist/util",
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
			filename: '/css/[name].css',
			disable: !isProduction,
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