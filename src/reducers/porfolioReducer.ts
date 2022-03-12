import { Reducer } from 'redux';
import { OPEN_TRADE, CLOSE_TRADE } from '@/actions/types';

let initialState = [];

// Open and Close trades from porfolio colletion in firebase
export const portfolioReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TRADE:
      return [...state, action.payload];
    case CLOSE_TRADE:
      return state.map((trade) => {
        if (trade.id === action.payload.id) {
          return {
            ...trade,
            ...action.payload,
          };
        }
        return trade;
      });
    default:
      return state;
  }
};
