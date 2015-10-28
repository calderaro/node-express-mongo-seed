module.exports = {
    entry: "./client/proxy.js",
    output: {
        path: __dirname+"/server/public/",
        filename: "bundle.js"
    },
    plugins: [
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
          // the optional 'runtime' transformer tells babel to require the runtime
          // instead of inlining it.
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true
            }
          },
          { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
          { test: /\.css$/, loader: 'style-loader!css-loader' }
        ],
        resolve: {
          extensions: ['', '.js', '.styl',".css"]
        }
    }
};