const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      querystring: require.resolve('querystring-es3'),
      os: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
          process,
        };
      },
    }),
    new Dotenv(),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    port: 8080,
  },
};
