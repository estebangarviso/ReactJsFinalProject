import { OPEN_TRADE, CLOSE_TRADE } from './types';
import firebase from '@/firebase';
import { set } from 'react-hook-form';

export const openTrade = (dataToSubmit: OpenTradeProps) => {
  const result = firebase
    .firestore()
    .collection('portfolio')
    .add({
      ...dataToSubmit,
      state: 'open',
    });
  return {
    type: OPEN_TRADE,
    payload: result,
  };
};

export const closeTrade = (dataToSubmit: CloseTradeProps) => {
  const { id, closePrice } = dataToSubmit;
  const result = firebase.firestore().collection('portfolio').doc(id).update({
    closePrice,
    state: 'close',
  });
  return {
    type: CLOSE_TRADE,
    payload: result,
  };
};
