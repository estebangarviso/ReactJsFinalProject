import { SET_LANGUAGE } from './types';

export const setLanguage = (language: string) => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
};
