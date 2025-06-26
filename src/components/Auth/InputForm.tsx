import { IconType } from 'react-icons';
import styled from 'styled-components';
interface Props {
  icon: IconType;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputForm = ({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
}: Props) => {
  return (
    <InputWrapper>
      <Icon className="icon" />
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      ></Input>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  .icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    color: #0a2647;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: none;
  border-radius: 4px;
  background: #d9d9d9;
`;
