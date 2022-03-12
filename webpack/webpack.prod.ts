import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'; // Minimize css files
import PurgeCSSPlugin from 'purgecss-webpack-plugin'; // Remove unused css to reduce bundle size
import path from 'path';
import glob from 'glob';
import { merge } from 'webpack-merge';
import commonCallback from './webpack.common';

// Rename __dirname to root path of project
__dirname = path.resolve(__dirname + '/../');

// Alter common config from callback
const common = commonCallback(false);

// Production plugins
if (common.plugins === undefined) common.plugins = []; // Initialize if undefined
const plugins = [
  ...common.plugins,
  new PurgeCSSPlugin({
    paths: () =>
      glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
        nodir: true,
      }),
  }),
];

// Production main config
const config = merge(common, {
  mode: 'production',
  plugins,
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      '...',
    ],
  },
});

export default config;
