import useInput from '@/hooks/useInput';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

type ReturnTypes = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => Promise<void>,
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
];

const useSearchThing = (initialData: string): ReturnTypes => {
  const navigate = useNavigate();
  const [thingName, handleThingName, setThingName] = useInput(initialData);
  const goToMain = async () => {
    // 주소
    const searchPath = `/search=${thingName}`;
    navigate(searchPath, {
      state: { thingName },
    });
    setThingName('');
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      goToMain();
    }
  };
  return [thingName, handleThingName, goToMain, onKeyDown];
};

export default useSearchThing;