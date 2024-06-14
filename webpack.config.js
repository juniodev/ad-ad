const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');


module.exports = {
  mode: 'production',
  entry: './ad_350x250.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1%',
                    'last 2 versions',
                    'ie >= 8']
                }
              }]
          ]
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new JavaScriptObfuscator( {
      rotateStringArray: true
    }, ['excluded_bundle_name.js'])
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
};