import Error from '@/components/Error';
import React, { Component } from 'react';
import img from '@img/500-error.png';

export const errorBoundary = (WrappedComponent) => {
  const resetError = (context) => context.setState({ error: false });

  return class extends Component {
    state = { error: false };
    static getDerivedFromError = () => ({ error: true });

    render() {
      const { props, state } = this;
      const { error } = state;
      const title = 'Something went wrong';
      const action = () => resetError(this);
      const ErrorRender = <Error img={img} title={title} action={action} />;
      const NormalRender = <WrappedComponent {...props} />;
      return error ? ErrorRender : NormalRender;
    }
  };
};
