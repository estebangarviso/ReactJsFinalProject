import { FaviconWebpackPlugionOptions } from 'favicons-webpack-plugin/src/options';
import { HtmlTagObject } from 'html-webpack-plugin';
import { exit } from 'process';
import { defaults, defaultlang } from '../src/config/defaultsConfig';

const WebpackOptionsConfig = () => {
  /**
   * FaviconsWebpackPlugin options
   */
  const faviconsWebpackPluginOptions: FaviconWebpackPlugionOptions = {
    logo: 'assets/img/logo.svg',
    prefix: 'assets/img/favicon/',
    inject: true,
    favicons: {
      appName: defaults.name,
      appShortName: defaults.name,
      background: '#f5edd3',
      theme_color: '#f5edd3',
    },
  };

  /**
   * Modify HtmlWebpackPlugin templateParameters during compilation
   */
  const templateParameters = (assetTags: {
    headTags: HtmlTagObject[];
    bodyTags: HtmlTagObject[];
  }) => {
    // Fixes favicons-webpack-plugin issues replacing tags url with public path
    const pluginsTags = assetTags.headTags
      .filter((tag) => tag.meta.plugin !== 'html-webpack-plugin')
      .map((tag) => {
        // Add public path to favicons webpack plugin head tags
        if (
          process.env.PUBLIC_PATH &&
          tag.meta.plugin === 'favicons-webpack-plugin' &&
          tag.attributes.href &&
          /^\/img\/favicon/g.test(tag.attributes.href as string)
        ) {
          tag.attributes.href = process.env.PUBLIC_PATH + tag.attributes.href;
        } else if (
          process.env.PUBLIC_PATH &&
          tag.meta.plugin === 'favicons-webpack-plugin' &&
          tag.attributes.content &&
          /^\/img\/favicon/g.test(tag.attributes.content as string)
        ) {
          tag.attributes.content =
            process.env.PUBLIC_PATH + tag.attributes.content;
        }
        return tag.toString();
      })
      .filter((tag, index, array) => array.indexOf(tag) === index)
      .join('');

    const stylesTags = assetTags.headTags
      .filter(
        (tag) =>
          tag.meta.plugin === 'html-webpack-plugin' &&
          /\.s?[ac]ss\??[\d\w]+$/.test(tag.attributes.href as string)
      )
      .map((tag) => tag.toString())
      .join('');

    const javascriptTags = assetTags.headTags
      .filter(
        (tag) =>
          tag.meta.plugin === 'html-webpack-plugin' &&
          /(\.js\??[\d\w]+)$/.test(tag.attributes.src as string)
      )
      .map((tag) => tag.toString())
      .join('');

    return {
      pluginsTags: pluginsTags,
      stylesTags: stylesTags,
      javascriptTags: javascriptTags,
      ...defaults,
      lang: defaultlang,
    };
  };

  return {
    faviconsWebpackPluginOptions,
    templateParameters,
  };
};

export default WebpackOptionsConfig;
