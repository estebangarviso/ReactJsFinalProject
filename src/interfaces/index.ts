export interface IContactFormFields {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

export interface ISignInFormFields {
  email: string;
  password: string;
  captchaToken: string;
}

export interface ISignUpFormFields extends ISignInFormFields {
  displayName: string;
  confirmPassword: string;
  captchaToken: string;
}

export interface IForgotPasswordFormFields {
  email: string;
  captchaToken: string;
}
