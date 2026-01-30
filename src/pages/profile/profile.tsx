import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/user/selectors';
import { fetchUpdateUser } from '../../services/user/thunks';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const name = user?.name || '';
  const email = user?.email || '';

  const [formValue, setFormValue] = useState({
    name,
    email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name,
      email
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== name ||
    formValue.email !== email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updateData: Partial<TRegisterData> = {
      name: formValue.name,
      email: formValue.email
    };

    if (formValue.password) {
      updateData.password = formValue.password;
    }

    dispatch(fetchUpdateUser(updateData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name,
      email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
