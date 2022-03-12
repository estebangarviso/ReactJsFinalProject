import React, { useState, useEffect, useRef } from 'react';
import '@styles/components/MarketTicker.scss';
import { useTranslation } from 'react-i18next';
import useHistory from '@/hooks/useHistoryPush';

const MarketTicker = (props: MarketTickerProps) => {
  const { t } = useTranslation('market');
  const [textColor, setTextColor] = useState('text-dark'); // text-red text-green text-dark
  const { data, porfolioTrades } = props;
  const {
    id,
    s: symbol,
    c: lastPrice,
    P: priceChangePercent,
    v: marketCap,
  } = data;

  const lastPriceRef = useRef(lastPrice);

  const handleChangeTextColor = () => {
    if (lastPriceRef.current > lastPrice) {
      setTextColor('text-red');
    } else if (lastPriceRef.current < lastPrice) {
      setTextColor('text-green');
    } else {
      setTextColor('text-dark');
    }
    lastPriceRef.current = lastPrice;
  };

  useEffect(() => {
    handleChangeTextColor();
  }, [lastPrice]);

  return (
    <div
      className='market-ticker'
      onClick={() => useHistory(`/ticker?${symbol.toLowerCase()}`).push}>
      <div className='market-ticker-symbol col-md-4'>{symbol}</div>
      <div className={`market-ticker-price col-auto ${textColor}`}>
        {lastPrice}
      </div>
      <div className={`market-ticker-change col-auto ${textColor}`}>
        {priceChangePercent}
      </div>
      <div className='market-ticker-market-cap col-auto d-none-md'>
        {marketCap}
      </div>
    </div>
  );
};

export default MarketTicker;
