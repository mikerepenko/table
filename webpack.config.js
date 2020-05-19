const path = require('path');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  devServer: {
    overlay: true
  },
  module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
         },
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'src/index.html' ),
         filename: 'index.html'
      })
   ]
}
