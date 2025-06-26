import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  margin: 0 auto; /* m-auto */
  border: 4px solid #3b82f6; /* border-4, border-blue-500 */
  border-top-color: transparent; /* border-t-transparent */
  border-radius: 9999px; /* rounded-full */
  animation: ${spin} 1s linear infinite; /* animate-spin */
`;
