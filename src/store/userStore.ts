import { makeAutoObservable } from 'mobx';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../hooks/useAuth';
interface UserInfoType {
  username: string;
  email: string;
}

class UserStore {
  username = '';
  email = '';

  constructor() {
    makeAutoObservable(this);
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodeToken = jwtDecode<TokenPayload>(token);
      this.username = decodeToken.name;
      this.email = decodeToken.username;
    }
  }

  setUser = ({ username, email }: UserInfoType) => {
    this.username = username;
    this.email = email;
  };

  clearUser = () => {
    this.username = '';
    this.email = '';
    localStorage.clear();
  };
}

export const userStore = new UserStore();
