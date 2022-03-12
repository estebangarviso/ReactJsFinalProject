import React from 'react';
import Dropdown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/actions/language_actions';
import { supportedlangs } from '@/config/defaultsConfig';
import { useTranslation } from 'react-i18next';
import { IconFlagUS, IconFlagES } from 'material-ui-flags';
import '@styles/components/LanguageSelector.scss';

const LanguageSelector = (props): JSX.Element => {
  const { ...otherProps } = props;
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLanguage = useSelector((state: any) => state.language);

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const getIcon = (lang: string): JSX.Element => {
    switch (lang) {
      case 'en':
        return <IconFlagUS className='icon-flag' />;
      case 'es':
        return <IconFlagES className='icon-flag' />;
      default:
        return <IconFlagUS className='icon-flag' />;
    }
  };

  return (
    <Dropdown
      iconBefore={getIcon(currentLanguage)}
      title={currentLanguage.toUpperCase()}
      {...otherProps}>
      {supportedlangs.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`dropdown-item ${
            lang === currentLanguage ? 'active' : ''
          }`}>
          {getIcon(lang)}
          {lang.toUpperCase()}
        </button>
      ))}
    </Dropdown>
  );
};

export default LanguageSelector;
