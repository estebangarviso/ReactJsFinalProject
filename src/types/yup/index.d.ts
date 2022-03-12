import { StringSchema } from 'yup';

// https://github.com/jquense/yup/issues/312
declare module 'yup' {
  interface StringSchema {
    emailExist(msg: string): StringSchema;
  }
}
