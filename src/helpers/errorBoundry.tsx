import Error from '@/components/Error';
import React, { Component } from 'react';
import img from '@img/500-error.png';
import { Translation } from 'react-i18next';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import history from '@/helpers/history';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const errorBoundary = (WrappedComponent) => {
  // Create a class component
  class ErrorBoundary extends Component {
    // Set the state to an empty object
    state = { error: null };

    // Set the componentDidCatch lifecycle method
    componentDidCatch(error, info) {
      // Set the error state to the error
      this.setState({ error });
      // Log the error to the console
      console.error(error, info);

      // Send the error to Sentry
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
      }
    }

    render() {
      // Set the error state to the error
      const { error } = this.state;
      // Set the title to something
      const title = (
        <Translation ns='error'>{(t) => t('Something went wrong')}</Translation>
      );
      // Set the action to reset the error
      const action = () => {
        setTimeout(() => {
          this.setState({ error: null });
        }, 5000);

        history.push('/');
      };
      // Set the error render to the error component
      const ErrorRender = <Error img={img} title={title} action={action} />;
      // Set the normal render to the wrapped component
      const NormalRender = <WrappedComponent {...this.props} />;
      // Return the error state is truthy
      return error ? ErrorRender : NormalRender;
    }
  }

  // Return the error boundary component
  return ErrorBoundary;
};

export default errorBoundary;
