import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'; // Pass the tsconfig alias paths to the webpack config
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Convert ejs template to html
import CopyWebpackPlugin from 'copy-webpack-plugin'; // Copy files and directories to the public directory
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'; // Generate favicons
import DotenvWebpackPlugin from 'dotenv-webpack'; // Load environment variables from .env file
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // Separate css files from js files
import path from 'path';
import dotenv from 'dotenv';
import WebpackOptionsConfig from './config'; // Code split for webpack config
import { Configuration } from 'webpack';

__dirname = path.resolve(__dirname + '/../');

const config = (devMode = true): Configuration => {
  // Load .env file before any other files
  if (!devMode)
    dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') });
  else dotenv.config();
  // then declare the webpack config
  const { faviconsWebpackPluginOptions, templateParameters } =
    WebpackOptionsConfig();
  return {
    context: path.resolve(__dirname, 'src'),
    entry: './index.tsx',
    output: {
      filename: devMode
        ? '[name].dev.js?[contenthash]'
        : '[name].js?[contenthash]',
      chunkFilename: devMode
        ? '[id].dev.js?[contenthash]'
        : '[id].js?[contenthash]',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      clean: true,
    },
    performance: {
      hints: !devMode ? 'error' : false,
      maxEntrypointSize: 580000,
      maxAssetSize: 580000,
    },
    devtool: 'source-map',
    devServer: {
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/api': '/api',
          },
        },
      },
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: './tsconfig.json',
          logLevel: 'INFO',
          extensions: ['tsx', '.ts', '.js', '.jsx', '.json'],
        }),
      ],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@styles': path.resolve(__dirname, 'src/assets/styles'),
        '@img': path.resolve(__dirname, 'src/assets/img'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: 'style-loader', // creates style nodes from JS strings
            },
            {
              loader: MiniCssExtractPlugin.loader, // extracts CSS into separate files
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: devMode,
              },
            },
            {
              loader: 'postcss-loader', // Run postcss actions
              options: {
                sourceMap: devMode,
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
              },
            },
            {
              loader: 'resolve-url-loader', // Resolve url() in css
              options: {
                sourceMap: devMode,
              },
            },
            {
              loader: 'sass-loader', // Compiles Sass to CSS
              options: {
                sourceMap: true,
                implementation: require.resolve('dart-sass'),
                sassOptions: {
                  includePaths: [path.resolve(__dirname, './node_modules')],
                },
              },
            },
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          //type: 'asset/resource',
          use: [
            'file-loader', // Resolves import / require() on a file into a url
            {
              loader: 'image-webpack-loader', // Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
              options: {
                bypassOnDebug: true,
                disable: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          // type: 'asset/inline',
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
              },
            }, // Transpile javascript, typescript and react
            {
              loader: 'react-svg-loader', // Optimize svg and load it as a React Component
              options: {
                jsx: true,
                svgo: {
                  plugins: [
                    { removeTitle: true },
                    { convertColors: { shorthex: false } },
                    { convertPathData: false },
                    { removeViewBox: true },
                    { removeUselessStrokeAndFill: false },
                    { removeEmptyAttrs: false },
                    { removeEmptyText: false },
                    { removeHiddenElems: false },
                    { removeEmptyContainers: false },
                  ],
                  floatPrecision: 4, // recommended option
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new DotenvWebpackPlugin(),
      new FaviconsWebpackPlugin(faviconsWebpackPluginOptions),
      new HtmlWebpackPlugin({
        template: 'index.html',
        publicPath: process.env.PUBLIC_PATH || '/',
        inject: false, // Will get the script tags from the template
        templateParameters: async (compilation, assets, assetTags) =>
          templateParameters(assetTags),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'assets/locales', to: 'assets/locales' }],
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css?[contenthash]',
        chunkFilename: '[id].chunk.css?[contenthash]',
      }),
    ],
    stats: {
      assets: true,
      children: true,
      chunks: true,
      errors: true,
      errorDetails: true,
      modules: true,
      timings: true,
      colors: true,
    },
  };
};

export default config;
