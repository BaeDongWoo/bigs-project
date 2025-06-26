import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { SigninForm } from './components/Auth/SigninForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupForm } from './components/Auth/SignupForm';
import { Board } from './components/Board/Board';
import { theme } from './styles/Theme';
import { BoardDetail } from './components/Board/BoardDetail';
import { WriteBoard } from './components/Board/WriteBoard';
import { EditBoard } from './components/Board/EditBoard';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Background>
          <Routes>
            <Route path="/" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/boards" element={<Board />} />
            <Route path="/boards/:id" element={<BoardDetail />} />
            <Route path="/boards/write" element={<WriteBoard />} />
            <Route path="/boards/:id/edit" element={<EditBoard />} />
          </Routes>
        </Background>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #b993d6, #8ca6db);
`;

export default App;
