import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { AuthApi } from '../../app/api';
import AuthForm from './AuthForm';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const onClickSend = async () => {
    const passwordToken = token || '';
    const { data } = (await AuthApi.resetPassword({ passwordConfirm, password }, passwordToken)) as {
      data: { token: string };
    };
    if (typeof data === 'object' && data?.token) {
      localStorage.setItem('jwt', data.token);
    }
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <AuthForm
      inputs={[
        { inputName: 'Пароль', setValue: setPassword, value: password },
        { inputName: 'Подтвердите пароль', setValue: setPasswordConfirm, value: passwordConfirm },
      ]}
      sendFc={onClickSend}
    />
  );
};

export default ResetPassword;
