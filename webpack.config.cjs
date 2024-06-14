const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.mjs'],
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
    }, [])
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  watch: false,
  watchOptions: {
    ignored: '**/node_modules',
  },
};