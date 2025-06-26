// import LocalStorage from '@/utils/localStorage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';
import { TokenPayload } from '../hooks/useAuth';

export const Instance = axios.create({
  baseURL: 'https://front-mission.bigs.or.kr',
  headers: {
    Accept: 'application/json',
  },
});

Instance.interceptors.request.use((config) => {
  // api요청에 토큰이 있으면 토큰 삽입
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Instance.interceptors.response.use(
  (response) => {
    //response에 문제가 없을시 그대로 반환
    return response;
  },
  async (error) => {
    //에러 캐치시 토큰 재발급 시도
    const eConfig = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response?.status === 401 && !eConfig._retry) {
      eConfig._retry = true;
      try {
        const res = await axios.post(
          //재발급 요청
          'https://front-mission.bigs.or.kr/auth/refresh',
          {
            refreshToken: refreshToken,
          }
        );
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        const decodeToken = jwtDecode<TokenPayload>(newAccessToken); // 토큰 디코딩
        userStore.setUser({
          username: decodeToken.name,
          email: decodeToken.username,
        });
        eConfig.headers.Authorization = `Bearer ${newAccessToken}`; // 헤더에 새롭게 발급받은 토큰을 삽입
        return Instance(eConfig); //재요청
      } catch (error) {
        console.log(error);
        alert('로그인정보가 만료 되었습니다 다시 로그인해주세요'); //refresh토큰 만료/오류시 재로그인요청
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);
