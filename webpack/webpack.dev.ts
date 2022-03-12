import path from 'path';
import { merge } from 'webpack-merge';
import commonCallback from './webpack.common';

// Rename __dirname to root path of project
__dirname = path.resolve(__dirname + '/../');

// Alter common config from callback
const common = commonCallback();

// Development plugins
if (common.plugins === undefined) common.plugins = []; // Initialize if undefined
const plugins = [
  ...common.plugins,
  /* Add addional development webpack plugins classes */
];

// Development main config
const config = merge(common, {
  mode: 'development',
  plugins,
});

export default config;
