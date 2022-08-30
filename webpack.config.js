const path =  require ('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
      },
      plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html'
        })
      ],
      performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
   },
      module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /(node_modules)/,
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