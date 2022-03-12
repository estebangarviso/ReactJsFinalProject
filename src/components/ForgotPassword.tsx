import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { auth } from '@/firebase';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './Form';
import { useTranslation } from 'react-i18next';
import '@styles/components/ForgotPassword.scss';
import { IForgotPasswordFormFields } from '@/interfaces';
import ReCAPTCHA from 'react-google-recaptcha';

// Send email to reset password to user's email if email exists in database
const ForgotPassword: React.FunctionComponent<ModalChildrenProps> = ({
  onChangeView,
}) => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation('forms');
  const schema = yup
    .object({
      email: yup.string().email().required(),
      captchaToken: yup.string().required(t('Recaptcha is required')),
    })
    .required();
  const { register, handleSubmit, setError, setValue, formState } =
      useForm<IForgotPasswordFormFields>({
        resolver: yupResolver(schema),
      }),
    errors = formState.errors;

  const onSubmit = (data: IForgotPasswordFormFields) => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setSuccess(true);
        setTimeout(() => history.push('/'), 3000);
      })
      .catch((error) => {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
      });
  };

  const onReCaptchaChange = (token) => {
    setValue('captchaToken', token);
  };

  return (
    <div className='forgot-password'>
      <h2 className='title'>{t('Forgot Password')}</h2>
      {onChangeView ? (
        <span>
          {t('Try to')}{' '}
          <a onClick={() => onChangeView('signIn')}>{t('sign in')}</a>{' '}
          {t('instead')} {t('if you already have an account')} {t('or')}{' '}
          <a onClick={() => onChangeView('signUp')}>{t('sign up')}</a>
        </span>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          label={t('Email')}
          {...register('email')}
          errors={errors.email}
        />
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY as string}
          onChange={onReCaptchaChange}
        />
        <button type='submit'>{t('Send')}</button>
        {success && (
          <div className='success-message'>
            {t('Check your email to reset your password')}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
