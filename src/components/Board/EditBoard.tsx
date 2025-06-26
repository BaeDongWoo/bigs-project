import { useNavigate, useParams } from 'react-router-dom';
import { BoardForm } from './BoardForm';
import { useEditBoard, useGetBoard } from '../../hooks/useBoard';
import { Spinner } from '../Common/Spinner';
import { useEffect } from 'react';

export const EditBoard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBoard(Number(id));
  const edit = useEditBoard(Number(id));
  const navigate = useNavigate();
  const handleSubmit = (data: FormData) => {
    edit.mutate(data);
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('다시 로그인을 해주세요');
      navigate('/', { replace: true });
    }
  }, []);
  if (isLoading) return <Spinner />;
  return (
    <BoardForm
      initialValues={{
        title: data.title,
        content: data.content,
        category: data.boardCategory,
        imageUrl: data.imageUrl,
      }}
      onSubmit={handleSubmit}
    />
  );
};
