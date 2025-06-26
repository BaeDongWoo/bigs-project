import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
interface BoardFormProps {
  initialValues?: {
    title: string;
    content: string;
    category: 'NOTICE' | 'FREE' | 'QNA' | 'ETC';
    imageUrl?: string;
  };
  onSubmit: (data: FormData) => void;
}

export const BoardForm = ({
  initialValues = {
    title: '',
    content: '',
    category: 'NOTICE',
    imageUrl: '',
  },
  onSubmit,
}: BoardFormProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [category, setCategory] = useState(initialValues.category);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const BASE_URL = 'https://front-mission.bigs.or.kr';
  const [previewUrl, setPreviewUrl] = useState(() =>
    // 수정작성 시 baseUrl추가
    initialValues.imageUrl?.startsWith('http')
      ? initialValues.imageUrl
      : initialValues.imageUrl
      ? `${BASE_URL}${initialValues.imageUrl}`
      : ''
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const requestPayload = {
      title: title,
      content: content,
      category: category,
    };
    const jsonBlob = new Blob([JSON.stringify(requestPayload)], {
      type: 'application/json',
    });
    formData.append('request', jsonBlob);
    if (imageFile) {
      formData.append('file', imageFile);
    }
    onSubmit(formData);
  };

  const handleClosed = () => {
    setImageFile(null);
    setPreviewUrl('');
  };

  return (
    <Container>
      <TiArrowBack className="backIcon" onClick={() => navigate('/boards')} />
      <Label>카테고리</Label>
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value as any)}
      >
        <option value="NOTICE">공지</option>
        <option value="FREE">자유</option>
        <option value="QNA">Q&A</option>
        <option value="ETC">기타</option>
      </Select>

      <Label>제목</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <Label>내용</Label>
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />

      <Label>이미지 업로드</Label>
      <UploadLabel htmlFor="inputFile">사진추가</UploadLabel>
      <CustomUpload
        type="file"
        id="inputFile"
        accept="image/*"
        onChange={handleImageChange}
      />
      {previewUrl && (
        <PreviewImageBox>
          <PreviewImage src={previewUrl} alt="미리보기" />
          <IoCloseCircleSharp className="closeIcon" onClick={handleClosed} />
        </PreviewImageBox>
      )}

      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </Container>
  );
};

const Container = styled.form`
  position: relative;
  width: 70%;
  max-width: 700px;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 1rem;
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
    width: 90%;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const UploadLabel = styled.label`
  width: 80px;
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  border: 2px solid #0a2647;
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  resize: none;
`;

const CustomUpload = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #0a2647;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;
const PreviewImageBox = styled.div`
  position: relative;
  max-width: 200px;
  max-height: 200px;
  display: flex;
  .closeIcon {
    position: absolute;
    color: #bd2121;
    top: -0.5rem;
    right: -0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  object-fit: contain;
`;
