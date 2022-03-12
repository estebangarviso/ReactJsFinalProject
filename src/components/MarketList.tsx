import React, { useEffect } from 'react';
import '@styles/components/MarketList.scss';
import MarketTicker from './MarketTicker';
import Error from './Error';
import Loader from './Loader';

const MarketList = () => {
  // useEffect(() => {
  //   getMarketTickers();
  // }, []);

  // const action = () => setTimeout(() => getMarketTickers(), 15000);

  return (
    <div className='market-list'>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Error action={action} />
      ) : (
        marketTickers.map((marketTicker) => (
          <MarketTicker key={marketTicker.id} data={marketTicker} />
        ))
      )} */}
    </div>
  );
};

export default MarketList;
