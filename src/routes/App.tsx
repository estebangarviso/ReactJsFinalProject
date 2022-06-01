import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageNotFound from '@/containers/PageNotFound';
import Contact from '@/containers/Contact';
import Profile from '@/containers/Profile';
import Login from '@/containers/Login';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import errorBoundary from '@/helpers/errorBoundry';
import '@styles/App.scss';
import { connect } from 'react-redux';
import { authUser } from '@/actions/user_actions';
import { setLanguage } from '@/actions/language_actions';
import { setTheme } from '@/actions/theme_actions';
import { useTranslation } from 'react-i18next';
import { defaults, defaultlang, supportedlangs } from '@/config/defaultsConfig';

// Load lazy containers
const Market = lazy(() => import('@/containers/Market'));

const App: React.FunctionComponent = (): JSX.Element => {
  const { title, site_name, fonts } = defaults;
  const { t, i18n } = useTranslation('routes');
  const joinedLangs = supportedlangs
    .filter((lang) => lang !== defaultlang)
    .join('|');
  const lang = i18n.language === defaultlang ? '' : i18n.language;
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet defaultTitle={title} titleTemplate={`%s | ${site_name}`}>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href={`https://fonts.googleapis.com/css?family=${fonts.default_typo}:300,400,700&display=swap`}
          rel='stylesheet'
        />
        <link
          href={`https://fonts.googleapis.com/css?family=${fonts.highlight_typo}:300,400,700&display=swap`}
          rel='stylesheet'
        />
      </Helmet>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={'/'} component={Market} />
            <Route path={`${lang}${t('/contact')}`} component={Contact} />
            <Route path={`${lang}${t('/profile')}`} component={Profile} />
            <Route path={`${lang}${t('/login')}`} component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  portfolio: state.portfolio,
  language: state.language,
  theme: state.theme,
});

const mapDispatchToProps = (dispatch: any) => ({
  authUser: (user: any) => {
    console.log({ userFromMapDispatchToProps: user });
    return dispatch(authUser());
  },
  setLanguage: (language: string) => dispatch(setLanguage(language)),
  setTheme: (theme: string) => dispatch(setTheme(theme)),
});

// pattern design react: HOC
export default errorBoundary(connect(mapStateToProps, mapDispatchToProps)(App));
