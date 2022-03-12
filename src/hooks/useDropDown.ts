import { useState } from 'react';

const useDropDown = () => {
  const [dropDown, setDropDown] = useState(false);

  const handleCloseDropDown = () => {
    setDropDown(false);
  };

  const handleOpenDropDown = () => {
    setDropDown(true);
  };

  return { dropDown, handleCloseDropDown, handleOpenDropDown };
};

export default useDropDown;
