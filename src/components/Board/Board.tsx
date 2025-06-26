import { BoardList } from './BoardList';
import styled from 'styled-components';

export const Board = () => {
  return (
    <Container>
      <BoardList />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
