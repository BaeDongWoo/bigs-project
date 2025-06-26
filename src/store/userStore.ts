import { makeAutoObservable } from 'mobx';

interface UserInfoType {
  username: string;
  email: string;
}

class UserStore {
  username = '';
  email = '';

  constructor() {
    makeAutoObservable(this);
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
