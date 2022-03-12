import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import '@styles/components/Form.scss';

export const Input: React.FunctionComponent<InputProps> = ({
  label,
  errors,
  textBefore,
  textAfter,
  ...otherProps
}): JSX.Element => (
  <div className='input-group has-validation'>
    {textBefore ? <span className='input-group-text'>{textBefore}</span> : null}
    <div className='form-floating'>
      <input
        className={`form-control${errors ? ' is-invalid' : ' is-valid'}`}
        {...otherProps}
      />
      <label htmlFor={otherProps.name}>{label}</label>
    </div>
    {textAfter ? <span className='input-group-text'>{textAfter}</span> : null}

    <ErrorMessage
      name={otherProps.name as string}
      errors={errors}
      render={(messages) =>
        messages && (
          <div className='invalid-feedback'>
            <ul>
              {Object.entries(messages).map(([type, message]) => (
                <li key={type}>{message}</li>
              ))}
            </ul>
          </div>
        )
      }
    />
  </div>
);

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  label,
  errors,
  ...otherProps
}): JSX.Element => (
  <div className='input-group has-validation'>
    <div className='form-floating'>
      <textarea
        className={`form-control${errors ? ' is-invalid' : ' is-valid'}`}
        {...otherProps}
      />
      <label htmlFor={otherProps.name}>{label}</label>
    </div>

    <ErrorMessage
      name={otherProps.name as string}
      errors={errors}
      render={(messages) =>
        messages && (
          <div className='invalid-feedback'>
            <ul>
              {Object.entries(messages).map(([type, message]) => (
                <li key={type}>{message}</li>
              ))}
            </ul>
          </div>
        )
      }
    />
  </div>
);
