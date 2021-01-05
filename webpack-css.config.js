const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')

const javascriptRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-env'
      ],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  }
}

const stylesRules = {
    test: /\.s[ac]ss$/i,
    use: [
        MiniCSSExtract.loader,
        // Creates `style` nodes from JS strings
        // 'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
    ],
}

const filesRules = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        outputPath: 'assets/images/',
        // publicPath: 'images/',
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
        outputPath: 'assets/fonts/',
        // publicPath: 'images/',
      },
    },
  ],
}

const developmentPlugins = []

const productionPlugins = [
  new CleanWebpackPlugin(),
  new CompressionPlugin(),
  new CssMinimizerPlugin(),
]

module.exports = (env, {mode}) => ({
  // output: {
  //   path: path.resolve(process.cwd(), __dirname + '/build'),
  //   filename: 'app.[contentHash].js'
  // },
  module: {
    rules: [
    //   javascriptRules,
      stylesRules,
      filesRules,
      fontsRules,
    ]
  },
  plugins: [
    ...(mode === 'production' ? productionPlugins : developmentPlugins),
    new HtmlWebpackPlugin({
      title: 'Guíah TV | Un espacio de fe',
      template: 'src/index.html',
      filename: '../index.html',
    }),
    new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ].filter(Boolean)
})