// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/app.js')],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',
      autoUpdate: 1000 * 60 * 60 * 12,
      responseStrategy: 'network-first',
      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['**/.*', '**/*.map', '**/*.gz'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js'],
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new WebpackPwaManifest({
      name: 'React Google Map',
      short_name: 'React Google Map',
      description: 'React Google Map',
      background_color: '#ffffff',
      theme_color: '#0883b4',
      display: 'standalone',
      orientation: 'portrait',
      ios: {
        'apple-mobile-web-app-title': 'React Google Map',
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: path.resolve('app/resources/images/app-icon.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
          type: 'image/png',
          ios: true,
        },
        {
          src: path.resolve('app/resources/images/app-icon.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
          type: 'image/png',
        },
        {
          src: path.resolve('app/resources/images/app-icon.png'),
          size: 1024,
          type: 'image/png',
          ios: 'startup',
        },
      ],
      start_url: '/',
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json', // Not to confuse with manifest.json
    }),
    // new SWPrecacheWebpackPlugin({
    //   // By default, a cache-busting query parameter is appended to requests
    //   // used to populate the caches, to ensure the responses are fresh.
    //   // If a URL is already hashed by Webpack, then there is no concern
    //   // about it being stale, and the cache-busting can be skipped.
    //   dontCacheBustUrlsMatching: /\.\w{8}\./,
    //   filename: 'service-worker.js',
    //   logger(message) {
    //     if (message.indexOf('Total precache size is') === 0) {
    //       // This message occurs for every build and is a bit too noisy.
    //       return;
    //     }
    //     console.log(message);
    //   },
    //   minify: true, // minify and uglify the script
    //   navigateFallback: '/index.html',
    //   staticFileGlobsIgnorePatterns: [
    //     /\.map$/,
    //     /asset-manifest\.json$/,
    //     /\.htaccess/,
    //   ],
    // }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
