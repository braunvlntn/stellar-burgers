import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from './order-info';

export const OrderInfoWrapper: FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  return (
    <Modal
      title={title}
      onClose={() => {
        navigate(location.pathname.split('/').slice(0, -1).join('/'));
      }}
    >
      <OrderInfo setTitle={setTitle} />
    </Modal>
  );
};
