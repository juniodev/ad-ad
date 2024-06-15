const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

const production = process.env.NODE_ENV

let options = {
  plugins: [
    new CleanWebpackPlugin(),
  ]
}

if (!production) {
  options = {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    }
  }
}

if (production) {
  options = {
    ...options,
    plugins: [
      ...options.plugins,
      new JavaScriptObfuscator( {
        rotateStringArray: true
      }, [])
    ]
  }
}

module.exports = {
  mode: production ? 'production': 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
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
  ...options,
  watchOptions: {
    ignored: '**/node_modules',
  },
};