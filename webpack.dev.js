const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
