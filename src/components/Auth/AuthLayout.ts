import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  positon: relative;
  background: rgba(255, 255, 255, 0.2);
  padding: 60px 40px 30px;
  border-radius: 20px;
  position: relative;
  width: 320px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  .backIcon {
    position: absolute;
    top: -1.5rem;
    left: -2rem;
    font-size: 4rem;
    cursor: pointer;
    color: #0a2647;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #0a2647;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
`;

export const LoginButton = styled.button`
  margin-top: 25px;
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #4c669f, #3b5998);
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  font-size: 14px;
`;
