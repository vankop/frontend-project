const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line xss/no-mixed-html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    publicPath: '/static',
    filename: '[name].[contenthash:8].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        type: 'javascript/esm',
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // eslint-disable-next-line xss/no-mixed-html
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
    // eslint-disable-next-line xss/no-mixed-html
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
  ],
};
