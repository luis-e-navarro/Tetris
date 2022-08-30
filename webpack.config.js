const path =  require ('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html'
        })
      ],
      module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          }
        ]
      },
}