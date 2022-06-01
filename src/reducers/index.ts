import { combineReducers } from 'redux';
import { portfolioReducer } from './porfolioReducer';
import { userReducer } from './userReducer';
import { languageReducer } from './languageReducer';
import { themeReducer } from './themeReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  user: userReducer,
  language: languageReducer,
  theme: themeReducer,
  router: routerReducer,
});

export default rootReducer;
