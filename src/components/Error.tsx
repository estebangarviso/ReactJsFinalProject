import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Error as ErrorIcon } from '@material-ui/icons';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorImg = styled.img`
  width: 100%;
  height: auto;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const Error: React.FunctionComponent<ErrorProps> = ({
  img,
  title,
  action,
}): JSX.Element => {
  useEffect(() => {
    action();
  }, []);

  return (
    <ErrorWrapper>
      {img ? (
        <ErrorImg alt='error-img' src={img} />
      ) : (
        <ErrorIcon color='error' fontSize='large' className='pulse' />
      )}
      {title ? <ErrorTitle className='error-title'>{title}</ErrorTitle> : null}
    </ErrorWrapper>
  );
};

export default Error;
