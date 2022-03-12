import React from 'react';
import { useTranslation } from 'react-i18next';
import img from '@img/404-error.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <Wrapper className='page-not-found'>
      <Image src={img} alt='404' />
      <Title className='page-not-found-title'>{t('Page not found')}</Title>
    </Wrapper>
  );
};

export default PageNotFound;
