import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import { Input } from './Form';
import CustomButton from './CustomButton';
import firebase, { createUserProfileDocument } from '@/firebase';
import '@styles/components/SignUp.scss';
import { useTranslation } from 'react-i18next';
import { ISignUpFormFields } from '@/interfaces';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/actions/user_actions';

yup.addMethod(yup.string, 'emailExist', function (message) {
  return this.test('emailExist', message, async function (value) {
    return await new Promise((resolve) => {
      if (!value) {
        resolve(false);
      }
      firebase
        .database()
        .ref('users')
        .orderByChild('email')
        .equalTo(value as string)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() !== null) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

const SignUp: React.FunctionComponent<ModalChildrenProps> = ({
  onChangeView,
}) => {
  const { t } = useTranslation('form');
  const dispatch = useDispatch();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t('Email is not valid'))
        .required(t('Email is required'))
        .emailExist(t('Email is already in use')),
      password: yup
        .string()
        .required(t('Password is required'))
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          t(
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
          )
        )
        .min(8, t('Password must be at 8 char long')),
      displayName: yup.string().required(t('Display name is required')),
      confirmPassword: yup
        .string()
        .required(t('Confirm password is required'))
        .oneOf([yup.ref('password')], 'Passwords does not match'),
      captchaToken: yup.string().required(t('Recaptcha is required')),
    })
    .required();

  const { register, handleSubmit, setValue, formState } =
      useForm<ISignUpFormFields>({
        resolver: yupResolver(schema),
      }),
    errors = formState.errors;

  const onSubmit = async (data) => {
    let dataToSubmit = {
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    };

    const register = await dispatch(registerUser(dataToSubmit)).payload;
    if (register) {
      const additionalData = Object.fromEntries(
        Object.entries(dataToSubmit).filter(
          ([key, value]) => key !== 'email' && key !== 'password'
        )
      );
      console.log(additionalData);
      createUserProfileDocument(register.user, additionalData);
    }
  };

  const onReCaptchaChange = (token) => {
    setValue('captchaToken', token);
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>{t('I do not have an account')}</h2>
      {onChangeView ? (
        <span>
          {t('Sign up with your email and password')} {t('or')}{' '}
          <a onClick={() => onChangeView('signIn')}>{t('go to sign in')}</a>
        </span>
      ) : null}
      <form
        className='sign-up-form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <Input
          type='text'
          label='Display Name'
          {...register('displayName')}
          errors={errors.displayName}
        />
        <Input type='email' name='email' label='Email' errors={errors.email} />
        <Input
          type='password'
          label='Password'
          {...register('password')}
          errors={errors.password}
        />
        <Input
          type='password'
          label='Confirm Password'
          {...register('confirmPassword')}
          errors={errors.confirmPassword}
        />
        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY as string}
          onChange={onReCaptchaChange}
        />
        <div className='buttons'>
          <CustomButton
            type='submit'
            disabled={!formState.isDirty || !formState.isValid}>
            SIGN UP
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
