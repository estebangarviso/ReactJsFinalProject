import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@img/logo.svg';
import { defaults } from '@/config/defaultsConfig';
import '@styles/components/Footer.scss';
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Telegram as TelegramIcon,
  Instagram as InstagramIcon,
  Reddit as RedditIcon,
  YouTube as YouTubeIcon,
} from '@material-ui/icons';
import BitcoinIcon from 'cryptocurrency-icons/svg/color/btc.svg';
import EthereumIcon from 'cryptocurrency-icons/svg/color/eth.svg';

const Footer: React.FunctionComponent = (): JSX.Element => {
  const { t } = useTranslation(['footer', 'common']);

  return (
    <footer id='footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <Logo className='logo-img' />
        </div>

        <div className='footer-lists'>
          <div className='footer-list-container'>
            <div className='footer-list-title'>{`${t('About', {
              ns: 'common',
            })} ${defaults.site_name}`}</div>

            <div className='footer-list-item'>
              <Link to='/'>{t('About us', { ns: 'footer' })}</Link>
            </div>

            <div className='footer-list-item'>
              <Link to='/'>{t('Methodology', { ns: 'footer' })}</Link>
            </div>

            <div className='footer-list-item'>
              <Link to='/'>{t('Careers', { ns: 'footer' })}</Link>
            </div>

            <div className='footer-list-item'>
              <Link to='/'>
                {t('Careers', { ns: 'footer' })}{' '}
                <span className='badge badge-success'>
                  {t('Join Us', { ns: 'footer' })}
                </span>
              </Link>
            </div>

            <div className='footer-list-item'>
              <Link to='/'>{t('Branding Guide', { ns: 'footer' })}</Link>
            </div>

            <div className='footer-list-item'>
              <Link to='/'>{t('Request Form', { ns: 'footer' })}</Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>{t('Advertising', { ns: 'footer' })}</Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>{t('FAQ', { ns: 'footer' })}</Link>
            </div>
          </div>

          <div className='footer-list-container'>
            <div className='footer-list-title'>
              {t('For Developers', { ns: 'footer' })}
            </div>
            <div className='footer-list-item'>
              <Link to='/'>{t('Developer API', { ns: 'footer' })}</Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>{t('Widgets', { ns: 'footer' })}</Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>{t('Contact', { ns: 'footer' })}</Link>
            </div>
            <br />
            <div className='footer-list-title'>
              {t('Donations', { ns: 'footer' })}
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <BitcoinIcon className='item-icon' />
                Bitcoin
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <EthereumIcon className='item-icon' />
                Ethereum
              </Link>
            </div>
          </div>
          <div className='footer-list-container'>
            <div className='footer-list-title'>
              {t('Community', { ns: 'footer' })}
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <TwitterIcon className='item-icon' />
                Twitter
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <TelegramIcon className='item-icon' />
                Telegram Chat
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <TelegramIcon className='item-icon' />
                Telegram News
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <FacebookIcon className='item-icon' />
                Facebook
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <InstagramIcon className='item-icon' />
                Instagram
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <RedditIcon className='item-icon' />
                Reddit
              </Link>
            </div>
            <div className='footer-list-item'>
              <Link to='/'>
                <YouTubeIcon className='item-icon' />
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>
          &copy; {new Date().getFullYear()} {t('by', { ns: 'common' })}{' '}
          <a
            href={defaults.copyrights.author.url}
            target='_blank'
            rel='noopener noreferrer'>
            {defaults.copyrights.author.name}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
