import React from 'react';
import ContactForm from '@/components/ContactForm';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation('contact');
  return (
    <>
      <Seo
        title={t('Contact us')}
        description={t(
          'Here you can send us a message, we will reply as soon as possible'
        )}
        keywords='contact, contact us'
        addMetaRobots={true}
        index={true}
        follow={true}
      />
      <section className='contact'>
        <ContactForm />
      </section>
    </>
  );
};

export default Contact;
