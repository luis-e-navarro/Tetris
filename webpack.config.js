const path =  require ('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
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
   devtool: false,
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
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ]
          },
          {
            test: /\.wav$/,
            loader: 'file-loader'
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
      },
      devServer: {
        host: 'localhost',
        port: 8080,
        // match the output path
        static: {
          directory: path.resolve(__dirname, 'dist'),
          // match the output 'publicPath'
          publicPath: '/',
        },
        // enable HMR on the devServer
        hot: true,
        // fallback to root for other urls
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
          "/api": "http://localhost:3000",
        },
      }
}