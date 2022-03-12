import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LanguageSelector from './LanguageSelector';
import Logo from '@img/logo-desktop.svg';
import '../assets/styles/components/Header.scss';
import { logoutUser } from '@/actions/user_actions';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import useHistory from '@/hooks/useHistoryPush';
import { useTranslation } from 'react-i18next';
import useOutside from '@/hooks/useOutside';

const Header: React.FunctionComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.userData);
  const navbarToggler = useRef(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  useOutside(navbarToggler, setNavbarOpen);
  const {
    modal,
    handleCloseModal,
    handleOpenModal,
    activeView,
    handleActiveView,
  } = useModal();

  const logout = () => {
    dispatch(logoutUser);
  };

  const openSignInModal = () => {
    handleOpenModal();
    handleActiveView('signIn');
  };

  const openSignUpModal = () => {
    handleOpenModal();
    handleActiveView('signUp');
  };

  return (
    <header id='header'>
      <div className='w-100'>
        <div className='row g-0'>
          <nav className='navbar navbar-custom navbar-expand-md'>
            <div className='col-3'>
              <Link className='navbar-brand' to={useHistory('/').path}>
                <div className='logo'>
                  <Logo className='logo-img' />
                </div>
              </Link>
            </div>
            <div className='col-9'>
              <div className='d-flex justify-content-end'>
                <LanguageSelector
                  className='header-language-selector'
                  isInNavbar={true}
                />
                <a
                  className='navbar-toggler'
                  type='button'
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  aria-expanded={navbarOpen ? 'true' : 'false'}
                  ref={navbarToggler}>
                  <span className='navbar-toggler-icon'></span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className='w-100'>
        <div className='row g-0'>
          <div className='col-md-12'>
            <nav className='nav nav-pills flex-column flex-sm-row navbar-expand-md'>
              <div
                className={`collapse ${
                  navbarOpen ? 'navbar-collapse show' : 'navbar-collapse'
                }`}>
                <Link
                  className='flex-sm-fill text-sm-center nav-link'
                  to={useHistory('/').path}>
                  {t('Market')}
                </Link>

                <Link
                  className='flex-sm-fill text-sm-center nav-link'
                  to={useHistory('/contact').path}>
                  {t('Contact')}
                </Link>
                {currentUser ? (
                  <>
                    <Link
                      className='flex-sm-fill text-sm-center nav-link'
                      to={useHistory('/profile').path}>
                      {currentUser.displayName}
                    </Link>
                    <a
                      className='flex-sm-fill text-sm-center nav-link'
                      onClick={logout}>
                      {t('Sign Out')}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className='flex-sm-fill text-sm-center nav-link'
                      onClick={openSignInModal}>
                      {t('Sign In')}
                    </a>

                    <a
                      className='flex-sm-fill text-sm-center nav-link'
                      onClick={openSignUpModal}>
                      {t('Sign Up')}
                    </a>
                    <Modal
                      isOpen={modal}
                      onClose={handleCloseModal}
                      currentView={activeView}>
                      <SignIn onChangeView={handleActiveView} />
                      <SignUp onChangeView={handleActiveView} />
                      <ForgotPassword onChangeView={handleActiveView} />
                    </Modal>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
