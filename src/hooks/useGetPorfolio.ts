import { useState } from 'react';
import firebase from '@/firebase';
import useLocalStorage from './useLocalStorage';

const useGetPorfilio = () => {
  const [portfolio, setPortfolio] = useLocalStorage('portfolio', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getPortfolio() {
    setLoading(true);
    try {
      const result = await firebase.firestore().collection('portfolio').get();
      setPortfolio(result.docs.map((doc) => doc.data()));
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  return { portfolio, loading, error, getPortfolio };
};

export default useGetPorfilio;
