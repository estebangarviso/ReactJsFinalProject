import React from 'react';
import Seo from '@/components/Seo';
import MarketList from '@/components/MarketList';
import { defaults } from '@/config/defaultsConfig';

const Market: React.FunctionComponent = () => {
  const { title, description, keywords } = defaults;
  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={keywords}
        addMetaRobots={true}
        index={true}
        follow={true}
      />
      <section className='market'>
        <MarketList />
      </section>
    </>
  );
};

export default Market;
