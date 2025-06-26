import { useEffect } from 'react';
import { useWriteBoard } from '../../hooks/useBoard';
import { BoardForm } from './BoardForm';
import { useNavigate } from 'react-router-dom';

export const WriteBoard = () => {
  const write = useWriteBoard();
  const navigate = useNavigate();
  const handleSubmit = (data: FormData) => {
    write.mutate(data);
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('다시 로그인을 해주세요');
      navigate('/', { replace: true });
    }
  }, []);
  return <BoardForm onSubmit={handleSubmit} />;
};
