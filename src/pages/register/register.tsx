import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { fetchRegistration } from '../../services/user/thunks';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setErrorText('');

    const response = await dispatch(
      fetchRegistration({ email, password, name: userName })
    );

    if (typeof response.payload === 'string') {
      setErrorText(response.payload);

      return;
    }

    navigate('/');
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
