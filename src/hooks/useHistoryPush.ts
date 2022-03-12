import { defaultlang } from '@/config/defaultsConfig';
import history from '@/helpers/history';
import { useTranslation } from 'react-i18next';

const useHistory = (route: string) => {
  const { t, i18n } = useTranslation();
  const path =
    i18n.language === defaultlang
      ? `${t(route)}`
      : `/${i18n.language}${t(route)}`;
  const push = () => history.push(path);
  return { path, push };
};

export default useHistory;
