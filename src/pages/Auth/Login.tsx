import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../../app/api';
import AuthForm from './AuthForm';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onClickSend = async () => {
    const { data } = (await AuthApi.login({ email, password })) as { data: { token: string } };
    if (typeof data === 'object' && data?.token) {
      localStorage.setItem('jwt', data.token);
    }

    navigate('/dashboard');
  };

  return (
    <AuthForm
      isLogin
      inputs={[
        { inputName: 'Email', setValue: setEmail, value: email },
        { inputName: 'Пароль', setValue: setPassword, value: password },
      ]}
      sendFc={onClickSend}
    />
  );
};

export default Login;
