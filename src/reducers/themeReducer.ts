import { Reducer } from 'redux';
import { SET_THEME } from '@/actions/types';

let initialState = 'light';

export const themeReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
};
