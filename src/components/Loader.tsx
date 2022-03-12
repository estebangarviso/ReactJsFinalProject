import React from 'react';
import { LinearProgress } from '@material-ui/core';
// import useAxiosProgressBar from '@/hooks/useAxiosProgressBar';

const Loader: React.FunctionComponent = (): JSX.Element | null => {
  // const progress = useAxiosProgressBar({ delay: 200 });

  return (
    <div className='loader'>
      <LinearProgress className='loader-icon' />
    </div>
    // <LinearProgress
    //   variant={progress > 0 ? 'determinate' : 'indeterminate'}
    //   value={progress}
    // />
  );
};

export default Loader;
