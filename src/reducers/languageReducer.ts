import { Reducer } from 'redux';
import { defaultlang } from '@/config/defaultsConfig';

let initialState = defaultlang;

export const languageReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};
