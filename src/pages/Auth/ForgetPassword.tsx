import { useState } from 'react';
import { AuthApi } from '../../app/api';
import AuthForm from './AuthForm';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onClickSend = async () => {
    const { data }: { data: { message: string } } = await AuthApi.forgetPassword({ email });
    setMessage(data.message);
  };

  return (
    <AuthForm
      message={message}
      setMessage={setMessage}
      inputs={[{ inputName: 'Email', setValue: setEmail, value: email }]}
      sendFc={onClickSend}
    />
  );
};

export default ForgetPassword;
