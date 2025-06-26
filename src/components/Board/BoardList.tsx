import { useEffect } from 'react';
import styled from 'styled-components';
import { useGetBoardList } from '../../hooks/useBoard';
import { TbWriting } from 'react-icons/tb';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Common/Spinner';
import { userStore } from '../../store/userStore';
import { boardStore } from '../../store/boardStore';
import { observer } from 'mobx-react-lite';
interface BoardItem {
  id: number;
  title: string;
  category: 'NOTICE' | 'FREE' | 'QNA' | 'ETC';
  createdAt: string;
}
const CATEGORY_MAP = {
  ALL: '전체',
  NOTICE: '공지',
  FREE: '자유',
  QNA: 'Q&A',
  ETC: '기타',
};

export const BoardList = observer(() => {
  const { page, setPage, category, setCategory } = boardStore;
  const { username } = userStore;
  const size = 10;
  const { data, isLoading } = useGetBoardList({ page: 0, size: 999 }); // 필터링을 위해 전체 데이터 조회
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { state: { resetStore: true } });
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('다시 로그인을 해주세요');
      navigate('/', { replace: true });
    }
  }, []);
  if (!data && isLoading) return <Spinner />;
  const sortData = data.content.sort(
    // 최신순 정렬
    (a: BoardItem, b: BoardItem) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const filteredData = // 카테고리별 데이터 필터링
    category === 'ALL'
      ? sortData
      : sortData.filter((item: BoardItem) => item.category === category);

  const totalPages = Math.ceil(filteredData.length / 10); // 필터링한 데이터의 총 페이지수
  const pagedContent = filteredData.slice(page * size, page * size + size); // 페이지의 별 컨텐츠 최대 10개
  return (
    <BoardContainer>
      <UserBox>
        <UserName>{username}님 환영합니다!</UserName>
        <Logout onClick={handleLogout}>로그아웃</Logout>
      </UserBox>
      <BoardHeader>
        <Tabs>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <Tab
              key={key}
              isActive={category === key}
              onClick={() => setCategory(key)}
            >
              {label}
            </Tab>
          ))}
        </Tabs>

        <HeaderRight onClick={() => navigate('/boards/write')}>
          <p>글작성</p>
          <TbWriting className="icon" />
        </HeaderRight>
      </BoardHeader>

      <List>
        {!pagedContent ? (
          <EmptyList>게시물이 존재하지 않습니다</EmptyList>
        ) : (
          pagedContent.map((item: BoardItem) => (
            <Item key={item.id} onClick={() => navigate(`/boards/${item.id}`)}>
              <Category>{CATEGORY_MAP[item.category]}</Category>
              <ContentTitle>{item.title}</ContentTitle>
              <DateTime>{moment(item.createdAt).format('YYYY/MM/DD')}</DateTime>
            </Item>
          ))
        )}
      </List>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton key={i} onClick={() => setPage(i)} $active={i === page}>
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </BoardContainer>
  );
});

const EmptyList = styled.p`
  font-weight: bold;
  color: #304674;
  text-align: center;
`;

const UserBox = styled.div`
  width: 100%;
  padding: 0.3rem;
  display: flex;
  position: relative;
`;

const Logout = styled.button`
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  color: #304674;
  right: 0;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 1024px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

const UserName = styled.span`
  margin: auto;
  padding: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 0.5rem;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #0a2647;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  .icon {
    font-size: 1.5rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    .icon {
      font-size: 1rem;
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1.2rem;
  margin: 0.3rem;
  background: ${({ isActive }) => (isActive ? '#304674' : '#fff')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#304674')};
  border: 2px solid #304674;
  border-radius: 5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #304674;
    color: white;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5px 7px;
    font-size: 0.5rem;
  }
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.5rem;
  }
`;

const Category = styled.span`
  background: #0a2647;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.5rem;
  }
`;

const ContentTitle = styled.span`
  flex: 1;
  margin-left: 1rem;
  color: #333;
  font-weight: 500;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const DateTime = styled.span`
  font-size: 0.75rem;
  color: #888;
`;

const Pagination = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: ${({ $active }) => ($active ? '#0a2647' : '#ddd')};
  color: ${({ $active }) => ($active ? '#fff' : '#000')};
  border-radius: 5px;
  cursor: pointer;
`;
