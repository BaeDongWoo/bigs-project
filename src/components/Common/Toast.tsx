import styled from 'styled-components';

interface ToastProps {
  isVisible: boolean;
  message: string;
}

export const Toast = ({ isVisible, message }: ToastProps) => {
  return <ToastBox isVisible={!isVisible}>{message}</ToastBox>;
};

const ToastBox = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: ${({ isVisible }) => (isVisible ? '3rem' : '-10rem')};
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10rem;
  color: #fff;
  transition: top 0.5s ease-in-out;
  z-index: 999;
`;
