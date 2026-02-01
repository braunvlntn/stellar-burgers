import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchLogin } from '../../services/user/thunks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setErrorText('');

    const response = await dispatch(fetchLogin({ email, password }));

    if (typeof response.payload === 'string') {
      setErrorText(response.payload);

      return;
    }

    const redirectPath = urlSearchParams.get('redirect');

    if (redirectPath) {
      navigate(redirectPath);

      return;
    }

    navigate('/');
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
