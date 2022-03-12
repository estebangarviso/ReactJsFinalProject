import React, { useState, useEffect } from 'react';
import { loginUser } from '@/src/actions/user_actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Input } from './Form';
import CustomButton from './CustomButton';
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from '@/firebase';
import '@styles/components/SignIn.scss';
import { useTranslation } from 'react-i18next';
import { ISignInFormFields } from '@/interfaces';
import { useDispatch } from 'react-redux';
import useLocalStorage from '@/hooks/useLocalStorage';

const SignIn: React.FunctionComponent<ModalChildrenProps> = ({
  onChangeView,
}) => {
  const { t } = useTranslation('form');
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t('Email is not valid'))
        .required(t('Email is required')),
      password: yup.string().required(t('Password is required')),
      captchaToken: yup.string().required(t('Recaptcha is required')),
    })
    .required();

  const { register, handleSubmit, setError, formState, setValue } =
      useForm<ISignInFormFields>({
        resolver: yupResolver(schema),
      }),
    errors = formState.errors;

  const onSubmit = (data: ISignInFormFields) => {
    let dataToSubmit = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(dataToSubmit))
      .payload.then((response) => {
        if (response) {
          setServerError('');
          useLocalStorage('userId', (response.user as any).id);
        }
        console.log(response);
      })
      .catch((error) => {
        setServerError(t('There was an error, please contact support'));
        console.error(error);
      });
  };

  useEffect(() => {
    if (serverError) {
      setError('email', {
        type: 'manual',
        message: serverError,
      });
    }
  }, [serverError]);

  const onReCaptchaChange = (token) => {
    setValue('captchaToken', token);
  };

  return (
    <div className='sign-in'>
      <h2 className='title'>{t('I already have an account')}</h2>
      <span>
        {t('Sign in with your email and password')}{' '}
        {onChangeView ? (
          <>
            or{' '}
            <a onClick={() => onChangeView('signUp')}>{t('go to sign up')}</a>
          </>
        ) : null}
      </span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          label='Email'
          {...register('email')}
          errors={errors.email}
        />
        <Input
          type='password'
          label='Password'
          {...register('password')}
          errors={errors.password}
        />
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY as string}
          onChange={onReCaptchaChange}
        />
        <div className='buttons'>
          <CustomButton
            type='submit'
            disabled={!formState.isDirty || !formState.isValid}>
            Sign In
          </CustomButton>
          <CustomButton type='button' onClick={() => signInWithFacebook()}>
            Sign In with Facebook
          </CustomButton>
          <CustomButton type='button' onClick={() => signInWithGithub()}>
            Sign In with Github
          </CustomButton>
          <CustomButton type='button' onClick={() => signInWithGoogle()}>
            Sign In with Google
          </CustomButton>
          <CustomButton type='button' onClick={() => signInWithTwitter()}>
            Sign In with Twitter
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
