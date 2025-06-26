import { Instance } from '../API';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { userStore } from '../store/userStore';

interface SigninProps {
  username: string;
  password: string;
}

interface SignupProps extends SigninProps {
  name: string;
  confirmPassword: string;
}

export interface TokenPayload {
  name: string;
  username: string;
}

export const useSignin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ username, password }: SigninProps) => {
      userStore.clearUser();
      const response = await Instance.post('/auth/signin', {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // 로그인 완료
      const decodeToken = jwtDecode<TokenPayload>(data.accessToken); // 토큰 디코딩
      userStore.setUser({
        username: decodeToken.name,
        email: decodeToken.username,
      });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/boards');
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({
      name,
      username,
      password,
      confirmPassword,
    }: SignupProps) => {
      userStore.clearUser();
      await Instance.post('/auth/signup', {
        name,
        username,
        password,
        confirmPassword,
      });
    },
    onSuccess: () => {
      navigate('/');
    },
  });
};
