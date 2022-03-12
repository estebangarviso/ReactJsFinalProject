import { combineReducers } from 'redux';
import { portfolioReducer } from './porfolioReducer';
import { userReducer } from './userReducer';
import { languageReducer } from './languageReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  user: userReducer,
  language: languageReducer,
  theme: themeReducer,
});

export default rootReducer;
