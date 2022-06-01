// Define the app configuration
export const defaults = {
  type: 'website',
  url: process.env.PUBLIC_URL,
  name: 'WololoCoin',
  site_name: 'WololoCoin',
  title: 'Cryptocurrency Prices, Charts, and Crypto Market Cap',
  description:
    'View top cryptocurrency prices live, crypto charts, market cap, and trading volume. Discover today’s new and trending coins, top crypto gainers and losers in the market.',
  keywords: 'cryptocurrency, trading signals, blockchain',
  fonts: {
    default_typo: 'Lato',
    highlight_typo: 'Poppins',
  },
  copyrights: {
    author: {
      name: 'Esteban Garviso',
      url: 'https://github.com/estebangarviso',
      email: 'e.garvisovenegas@gmail.com',
    },
  },
};
export const passwordMinLength = 8;
export const themeNames = ['light', 'dark'];
export const defaultlang = 'en';
export const supportedlangs = ['en', 'es'];
export const firebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'bases-react-escalab-academy.firebaseapp.com',
  projectId: 'bases-react-escalab-academy',
  storageBucket: 'bases-react-escalab-academy.appspot.com',
  messagingSenderId: '380630763880',
  appId: '1:380630763880:web:3741388a673c65f268aedd',
};
