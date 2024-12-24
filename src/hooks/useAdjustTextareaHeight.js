import { useEffect } from 'react';

export default function useAdjustTextareaHeight(textareaRef, changedValue) {
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [changedValue]);
}
