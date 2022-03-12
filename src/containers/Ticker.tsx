import React from 'react';
import Seo from '@/components/Seo';
import MarketTickerDetail from '@/components/MarketTickerDetail';
import { defaults } from '@/config/defaultsConfig';
import { useTranslation } from 'react-i18next';

const Ticker: React.FunctionComponent = () => {
  const { t } = useTranslation('trade');
  const { price, symbol } = { price: 1, symbol: 'BTC' };

  return (
    <>
      <Seo
        title={`${price} | ${symbol} | ${defaults.name} ${t('Spot')}`}
        description={`${defaults.name} ${t('meta_description')}`}
        keywords={''}
        addMetaRobots={false}
      />
      <section className='market-ticker-details'>
        <MarketTickerDetail />
      </section>
    </>
  );
};

export default Ticker;
