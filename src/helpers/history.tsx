import { createBrowserHistory } from 'history';

// Adjust router history to use browser history for enviorment
export default createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});
