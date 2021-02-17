const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  externals: [nodeExternals()],
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },

  watchOptions: {
    aggregateTimeout: 500,
    poll: 500,
    ignored: ['node_modules/**'],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
     },
    ],
  },
};
