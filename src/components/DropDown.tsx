import React, { useRef, useState } from 'react';
import '@styles/components/DropDown.scss';
import useOutside from '@/hooks/useOutside';

const Dropdown: React.FunctionComponent<DropDownProps> = ({
  title,
  children,
  iconAfter = '',
  iconBefore = '',
  isInNavbar = false,
  ...otherProps
}): JSX.Element => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  useOutside(dropdownRef, setIsActive);
  const onClick = () => setIsActive(!isActive);

  return (
    <div
      className={`${isInNavbar ? 'nav-item ' : ''}dropdown${
        otherProps && 'className' in otherProps
          ? ' ' + (otherProps.className as string)
          : ''
      }`}
      ref={dropdownRef}>
      <a
        className={`${isInNavbar ? 'nav-item ' : ''}dropdown-toggle`}
        onClick={onClick}>
        {iconBefore}
        {title}
        {iconAfter}
      </a>

      <div
        className={`dropdown-menu${isActive ? ' show' : ''}`}
        ref={dropdownRef}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
