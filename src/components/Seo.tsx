import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '@img/logo.png';
import { defaults } from '@/config/defaultsConfig';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type SeoProps = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  altImage?: string;
  addMetaRobots?: boolean;
  follow?: boolean;
  index?: boolean;
  children?: React.ReactNode;
};

const Seo = ({
  children,
  title,
  description = '',
  keywords = '',
  image = logo,
  altImage = defaults.site_name,
  addMetaRobots = false,
  follow = false,
  index = false,
  ...otherProps
}: SeoProps): JSX.Element => {
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <Helmet {...otherProps}>
      <html lang={i18n.language} />
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {/* Head General */}
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='canonical' href={location.pathname} />
      {/* Head OpenGraph */}
      <meta property='og:type' content={defaults.type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={location.pathname} />
      <meta property='og:image' content={image} />
      {/* Head Twitter */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:url' content={location.pathname} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:image:alt' content={altImage} />
      {addMetaRobots ? (
        <meta
          name='robots'
          content={`${follow ? 'follow' : 'noindex'}, ${
            index ? 'index' : 'noindex'
          }`}
        />
      ) : (
        ''
      )}
      {children}
    </Helmet>
  );
};

export default Seo;
