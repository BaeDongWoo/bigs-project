import styled from 'styled-components';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import {
  Container,
  FormBox,
  FormContainer,
  IconWrapper,
  LoginButton,
} from './AuthLayout';
import { TiArrowBack } from 'react-icons/ti';
import { InputForm } from './InputForm';
import { useState } from 'react';
import { isValidSignup } from '../../utils/Validate';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../Common/Toast';
import { useSignup } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const { isVisible, message, showToast } = useToast();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // target의 name과 value 구조분해
    setSignupData(() => ({ ...signupData, [name]: value }));
  };

  const signup = useSignup();
  const handleSumit = () => {
    const valid = isValidSignup({ ...signupData, showToast });
    if (!valid) return;
    signup.mutate(signupData, {
      onError: (e: any) => {
        showToast(e.response.data.username[0]);
      },
    });
  };
  return (
    <Container>
      <FormContainer>
        <TiArrowBack className="backIcon" onClick={() => navigate('/')} />
        <IconWrapper>
          <FaUser size={40} color="#fff" />
        </IconWrapper>
        <FormBox>
          <InputForm
            icon={FaUser}
            type="text"
            placeholder="사용자 이름"
            name="name"
            value={signupData.name}
            onChange={onChangeHandler}
          />
          <InputForm // username
            icon={MdAlternateEmail}
            type="email"
            placeholder="이메일"
            name="username"
            value={signupData.username}
            onChange={onChangeHandler}
          />
          <InputForm
            icon={FaLock}
            type="password"
            placeholder="비밀번호"
            name="password"
            value={signupData.password}
            onChange={onChangeHandler}
          />
          <InputForm
            icon={FaLock}
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={onChangeHandler}
          />
        </FormBox>
        <LoginButton onClick={handleSumit}>회원가입</LoginButton>
      </FormContainer>
      <Toast isVisible={isVisible} message={message} />
    </Container>
  );
};
