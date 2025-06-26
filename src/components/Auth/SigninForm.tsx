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
import { InputForm } from './InputForm';
import { useSignin } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Toast } from '../Common/Toast';
import { useToast } from '../../hooks/useToast';
import { isValidSignin } from '../../utils/Validate';
import { useLocation } from 'react-router-dom';
import { boardStore } from '../../store/boardStore';
import { userStore } from '../../store/userStore';
import { observer } from 'mobx-react-lite';

export const SigninForm = observer(() => {
  const [signinData, setSigninData] = useState({
    username: '',
    password: '',
  });
  const location = useLocation();
  const { isVisible, message, showToast } = useToast();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // target의 name과 value 구조분해
    setSigninData(() => ({ ...signinData, [name]: value }));
  };
  const signin = useSignin();
  const handleSumit = () => {
    const valid = isValidSignin({ ...signinData, showToast });
    if (!valid) return;
    signin.mutate(signinData, {
      onError: (e: any) => {
        showToast(e.response.data.message);
      },
    });
  };
  useEffect(() => {
    if (location.state?.resetStore) {
      boardStore.initBoardStore();
      userStore.clearUser();
    }
  }, []);
  return (
    <Container>
      <FormContainer>
        <IconWrapper>
          <FaUser size={40} color="#fff" />
        </IconWrapper>
        <FormBox>
          <InputForm // username
            icon={MdAlternateEmail}
            type="email"
            placeholder="이메일"
            name="username"
            value={signinData.username}
            onChange={onChangeHandler}
          />
          <InputForm
            icon={FaLock}
            type="password"
            placeholder="비밀번호"
            name="password"
            value={signinData.password}
            onChange={onChangeHandler}
          />
          <Options>
            <SignupLink href="/signup">회원이 아니신가요?</SignupLink>
          </Options>
        </FormBox>
        <LoginButton onClick={handleSumit}>로그인</LoginButton>
      </FormContainer>
      <Toast isVisible={isVisible} message={message} />
    </Container>
  );
});

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #fff;
  margin-top: 5px;
`;

const SignupLink = styled.a`
  color: #eee;
  font-weight: bold;
  text-decoration: none;
  font-style: italic;
`;
