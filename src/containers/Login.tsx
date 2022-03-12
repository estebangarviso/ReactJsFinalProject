import React from 'react';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import ForgotPassword from '@/components/ForgotPassword';
import { useSelector } from 'react-redux';
import useHistory from '@/hooks/useHistoryPush';

const Login = () => {
  const currentUser = useSelector((state: any) => state.user);
  // useHistoryPush('/');
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-6 offset-lg-3'>
              <SignIn />
            </div>
            <div className='col-12 col-lg-6 offset-lg-3'>
              <SignUp />
            </div>
            <div className='col-12 col-lg-6 offset-lg-3'>
              <ForgotPassword />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
