import { useSelector } from 'react-redux';

const getUUID = () => {
  const uuid = useSelector((state: any) => {
    return state.userID.value;
  });
  return { uuid };
};

export { getUUID };
