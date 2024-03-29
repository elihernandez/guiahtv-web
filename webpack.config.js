const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
var config = require('./config')

const javascriptRules = {
	test: /\.js$/,
	exclude: /node_modules/,
	// use: {
	// 	loader: 'swc-loader'
	// }
	use: {
		loader: 'babel-loader',
		options: {
			presets: [
				[
					'@babel/preset-react',
					{
						runtime: 'automatic'
					}
				],
				[
					'@babel/preset-env',
					{
						'targets': {
							'chrome': '38'
						}
					}
				]
			],
			plugins: [
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-transform-react-inline-elements',
				'@babel/transform-runtime'
			]
		}
	}
}

const stylesRules = {
	test: /\.css$/i,
	use: [
		MiniCSSExtract.loader,
		'css-loader',
		// 'sass-loader',
		'postcss-loader'
	],
}

const filesRules = {
	test: /\.(webp|png|svg|jpg|gif)$/,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'assets/images/'
			},
		},
	],
}

const fontsRules = {
	test: /\.(woff|woff2|eot|ttf|otf)$/,
	use: [
		{
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'assets/fonts/'
			},
		},
	],
}

const developmentPlugins = [
]

const productionPlugins = [
	new CleanWebpackPlugin(),
	new CompressionPlugin(),
	new CssMinimizerPlugin(),
]

module.exports = (env, { mode }) => ({
	output: {
		path: path.resolve(process.cwd(), __dirname + '/build'),
		filename:  (mode === 'production' ? 'app.min.[contenthash].js' : 'app.min.js'),
		publicPath: (mode === 'production' ? config.prodPath : config.devPath),
	},
	watch: (mode === 'production' ? false : true),
	module: {
		rules: [
			javascriptRules,
			stylesRules,
			filesRules,
			fontsRules
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		...(mode === 'production' ? productionPlugins : developmentPlugins),
		new HtmlWebpackPlugin({
			favicon: './src/assets/images/logos/guiahtv/favicon.ico',
			title: 'Guíah TV | Un espacio de fe',
			template: 'src/index.html',
			filename: '../index.html',
		}),
		new MiniCSSExtract({
			filename: (mode === 'production' ? 'app.min.[contenthash].css' : 'app.min.css'),
			chunkFilename: (mode === 'production' ? 'main.min.[contenthash].css' : 'main.min.css'),
		})
	].filter(Boolean)
})