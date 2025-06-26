import { Toast } from '../components/Common/Toast';

interface SigninProps {
  username: string;
  password: string;
  showToast: (message: string) => void;
}

interface SignupProps extends SigninProps {
  name: string;
  confirmPassword: string;
}

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;
  return regex.test(password);
};

export const isValidSignin = ({
  username,
  password,
  showToast,
}: SigninProps) => {
  if (!isValidEmail(username.trim()) && !isValidPassword(password.trim())) {
    showToast('잘못된 이메일 또는 비밀번호 입니다');
    return false;
  }
  return true;
};

export const isValidSignup = ({
  name,
  username,
  password,
  confirmPassword,
  showToast,
}: SignupProps) => {
  if (
    name.trim() === '' &&
    !isValidEmail(username.trim()) &&
    !isValidPassword(password.trim())
  ) {
    showToast('잘못된 입력입니다.');
    return false;
  }
  if (password !== confirmPassword) {
    showToast('비밀번호를 확인해 주세요');
    return false;
  }
  return true;
};
