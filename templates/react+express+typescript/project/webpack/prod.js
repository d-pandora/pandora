const webpack = require('webpack')
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const version = require('../package.json').version
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



module.exports = {
  mode: 'production',
  entry: [
    path.join(__dirname, '../src/view/index.tsx'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: `${version}-main.js`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'webpack/tsconfig.json',
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              })]
            }),
          },
        }]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              modifyVars: { 'font-size-base': '12px' },
              javascriptEnabled: true,
            },
          }
        ],
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      pages: path.resolve(__dirname, `../src/view/pages`),
      components: path.resolve(__dirname, "../src/view/components")
    }
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    // new BundleAnalyzerPlugin(),
  ],
}
