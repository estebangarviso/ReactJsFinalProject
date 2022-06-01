import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, TextArea } from './Form';
import '@styles/components/ContactForm.scss';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { Clear, Check } from '@material-ui/icons';
import { IContactFormFields } from '@/interfaces';

// Send email by Formspark
const ContactForm: React.FunctionComponent = (): JSX.Element => {
  const { t } = useTranslation('form');
  const [isLoading, setIsloading] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState('primary');

  const schema = yup.object().shape({
    name: yup.string().required(t('Name is required')),
    email: yup
      .string()
      .email(t('Email is not valid'))
      .required(t('Email is required')),
    message: yup.string().required(t('Message is required')),
    captchaToken: yup.string().required(t('Recaptcha is required')),
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<IContactFormFields>({
      resolver: yupResolver(schema),
      mode: 'all',
    });
  const errors = formState.errors;

  const onSubmit = async (dataToSubmit: IContactFormFields) => {
    setIsloading(true);
    try {
      const response = await axios.post(
        process.env.FORMSPARK_URL as string,
        dataToSubmit
      );
      console.log(response);
      setIsloading(false);
      setButtonSubmit('success');

      setTimeout(() => {
        setButtonSubmit('primary');
      }, 5000);
    } catch (error) {
      console.error(error);
      setIsloading(false);
      setButtonSubmit('error');

      setTimeout(() => {
        setButtonSubmit('primary');
      }, 5000);
    }
  };

  const onReCaptchaChange = (token) => {
    setValue('captchaToken', token);
  };

  return (
    <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label={t('Name')}
        {...register('name')}
        errors={errors.name}
      />
      <Input label={t('Email')} {...register('email')} errors={errors.email} />
      <TextArea
        label={t('Message')}
        {...register('message')}
        errors={errors.message}
      />
      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        onChange={onReCaptchaChange}
      />
      <button
        type='submit'
        className={`btn btn-${buttonSubmit}`}
        disabled={!formState.isDirty || !formState.isValid}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {buttonSubmit === 'primary' ? t('Send') : null}
            {buttonSubmit === 'success' ? <Check /> : null}
            {buttonSubmit === 'error' ? <Clear /> : null}
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
