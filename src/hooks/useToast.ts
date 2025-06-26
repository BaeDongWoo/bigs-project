import { useState } from 'react';

export const useToast = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const showToast = (message: string) => {
    if (message === '') return;
    setMessage(message);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2초 후 제거
  };

  return { isVisible, message, showToast };
};
