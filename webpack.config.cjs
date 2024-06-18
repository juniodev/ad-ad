const path = require('path');
const webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const HtmlWebpackPlugin = require('html-webpack-plugin')


const DotEnv = require('dotenv-webpack')
const env = require('dotenv')
env.config()

const production = process.env.NODE_ENV

let options = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin( {
      template: './index.html', // Caminho para o seu arquivo index.html
      filename: 'index.html',
    }),
    new DotEnv( {
      path: '.env',
      defaultEnv: production ? 'production': 'development',
      systemvars: false,
    }),
  ]
}

if (!production) {
  options = {
    ...options,
    devServer: {
      
      compress: true,
      port: 9000
    },
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
  entry: {
    banner: './src/index.js',
    intertitial: './src/intertitial/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
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
    ignored: ['**/node_modules'],
  }
};