import React from 'react';
import '@styles/components/Layout.scss';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({ children }): JSX.Element => {
  return (
    <div className='layout'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
