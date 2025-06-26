import { useMutation, useQuery } from '@tanstack/react-query';
import { Instance } from '../API';
import { useNavigate } from 'react-router-dom';

export const useGetBoardList = ({ page = 0, size = 10 }) => {
  return useQuery({
    queryKey: ['boardList', page, size],
    queryFn: async () => {
      const response = await Instance.get(`/boards?page=${page}&size=${size}`);
      return response.data;
    },
  });
};

export const useGetBoard = (id: number) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: async () => {
      const response = await Instance.get(`/boards/${id}`);
      return response.data;
    },
  });
};

interface DeleteBoardProps {
  id: number;
}

export const useDeleteBoard = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ id }: DeleteBoardProps) => {
      await Instance.delete(`/boards/${id}`);
    },
    onSuccess: () => {
      alert('삭제되었습니다.');
      navigate('/boards');
    },
  });
};

export const useWriteBoard = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await Instance.post('/boards', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      alert('게시글 작성이 완료 되었습니다.');
      navigate('/boards');
    },
  });
};

export const useEditBoard = (id: number) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await Instance.patch(`/boards/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      alert('게시글 수정이 완료 되었습니다.');
      navigate('/boards');
    },
  });
};
