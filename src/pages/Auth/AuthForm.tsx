/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { isAxiosError } from 'axios';
import { NavLink } from 'react-router-dom';
import { FormEditorFieldStyled, FormEditorSubmitStyled } from '../../components/Shared';
import SnackbarComponent from '../../components/Snackbar';
import { isFullError } from '../../types/thunkFactory';
import { IAuthFormProps } from './types';
import { AuthFormButtonWrapper, AuthFormLink, AuthFormStyled, AuthFormWrapper } from './AuthFormStyled';

const AuthForm = ({ inputs, sendFc, message, setMessage, isLogin }: IAuthFormProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickSend = async () => {
    try {
      setError('');
      if (setMessage) {
        setMessage('');
      }
      setLoading(true);
      await sendFc();
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (isFullError(e.response?.data)) {
          setError(e.response?.data.message as string);
        } else {
          setError(e.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <AuthFormWrapper>
      <AuthFormStyled>
        {inputs.map((inputItem, i) => {
          return (
            <FormEditorFieldStyled
              autoComplete='off'
              key={i}
              InputLabelProps={{
                shrink: true,
              }}
              variant='filled'
              label={inputItem.inputName}
              placeholder={inputItem.inputName}
              value={inputItem.value}
              onChange={(e) => inputItem.setValue(e.target.value)}
            />
          );
        })}
        <AuthFormButtonWrapper>
          <FormEditorSubmitStyled
            sx={{ marginBottom: '40px' }}
            color='success'
            loading={loading}
            onClick={onClickSend}
            disabled={loading}
            variant='contained'>
            Отправить
          </FormEditorSubmitStyled>
        </AuthFormButtonWrapper>
        {isLogin && (
          <AuthFormLink>
            <NavLink style={{ color: '#fff', textDecoration: 'none' }} to='/forgetPassword'>
              Забыли пароль?
            </NavLink>
          </AuthFormLink>
        )}
        {message && <SnackbarComponent formError={message} color='success' />}
        {error && <SnackbarComponent formError={error} />}
      </AuthFormStyled>
    </AuthFormWrapper>
  );
};

export default AuthForm;
