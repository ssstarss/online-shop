/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, './src/index.ts'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },

      { test: /\.svg$/, use: 'svg-inline-loader' },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    port: 8080,
  },
};
