import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Facebook, Twitter, GitHub } from '@material-ui/icons';
import Google from '@img/icons/Google.svg';
import '@styles/components/CustomButton.scss';

const CustomButton: React.FunctionComponent<CustomButtonProps> = ({
  children,
  icon,
  isLoading = false,
  ...otherProps
}): JSX.Element => (
  <button
    className={`${icon ? icon + '-sign-in' : ''} custom-button`}
    {...otherProps}>
    <Icon icon={icon} />
    {children}
    {isLoading ? <CircularProgress className='text-info' /> : null}
  </button>
);

const Icon = ({ icon }: { icon: string | undefined }): JSX.Element | null => {
  switch (icon) {
    case 'google':
      return <Google className='custom-button-icon' />;
    case 'facebook':
      return <Facebook className='custom-button-icon' />;
    case 'twitter':
      return <Twitter className='custom-button-icon' />;
    case 'github':
      return <GitHub className='custom-button-icon' />;
    default:
      return null;
  }
};

export default CustomButton;
