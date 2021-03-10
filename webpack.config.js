const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { ESBuildPlugin } = require('esbuild-loader')
const path = require('path')
var config = require('./config')

const javascriptRules = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: [
				'@babel/preset-react',
				[
					'@babel/preset-env',
					{
						'targets': {
							'chrome': '38'
						}
					}
				]
			],
			plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/transform-runtime']
		}
	}
}

// const javascriptRules = {
//   test: /\.js$/,
//   exclude: /node_modules/,
//   loader: 'esbuild-loader',
//   options: {
//     target: 'es2016' // Syntax to compile to (see options below for possible values)
//   }
// }

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
				name: '[name].[contenthash].[ext]',
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
				name: '[name].[contenthash].[ext]',
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
		filename: 'app.min.js',
		publicPath: (mode !== 'production' ? config.devPath : config.prodPath),
	},
	watch: (mode === 'production' ? false : true),
	module: {
		rules: [
			javascriptRules,
			stylesRules,
			filesRules,
			fontsRules,
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
			filename: 'app.min.css',
			chunkFilename: 'main.css',
		}),
		new ESBuildPlugin()
	].filter(Boolean)
})
