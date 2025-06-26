import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';
import { useDeleteBoard, useGetBoard } from '../../hooks/useBoard';
import moment from 'moment';
import { Spinner } from '../Common/Spinner';
import { useEffect } from 'react';

const CATEGORY_MAP = {
  NOTICE: '공지',
  FREE: '자유',
  QNA: 'Q&A',
  ETC: '기타',
} as const;

export const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const { data, isLoading } = useGetBoard(Number(id));
  const deleteMutate = useDeleteBoard();
  const handleEdit = () => {
    navigate(`/boards/${id}/edit`);
  };
  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    deleteMutate.mutate({ id: Number(id) });
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('다시 로그인을 해주세요');
      navigate('/', { replace: true });
    }
  }, []);
  if (isLoading) return <Spinner />;

  return (
    <Container>
      <TiArrowBack className="backIcon" onClick={() => navigate('/boards')} />
      <TitleBox>
        <TitleWrap>
          <h2>{data.title}</h2>
          <Category>
            {CATEGORY_MAP[data.boardCategory as keyof typeof CATEGORY_MAP]}
          </Category>
        </TitleWrap>
        <ButtonWrap>
          <FaEdit onClick={handleEdit} />
          <FaTrash onClick={handleDelete} />
        </ButtonWrap>
      </TitleBox>
      <Date>{'작성날짜 : ' + moment(data.createdAt).format('YYYY-MM-DD')}</Date>
      {data.imageUrl && (
        <Image src={`${baseUrl}${data.imageUrl}`} alt="게시물 이미지" />
      )}
      <Content>{data.content}</Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 70%;
  max-width: 700px;
  min-height: 700px;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .backIcon {
    position: absolute;
    top: -1.5rem;
    left: -2rem;
    font-size: 4rem;
    cursor: pointer;
    color: #0a2647;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
    min-height: 500px;
    padding: 1rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
    color: #0a2647;
    &:hover {
      color: #304674;
    }
  }
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

const Category = styled.div`
  font-size: 0.9rem;
  background: #0a2647;
  color: white;
  padding: 0.2rem 0.6rem;
  display: inline-block;
  border-radius: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

const Date = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: gray;
  margin: 0.5rem 0 1rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
`;
