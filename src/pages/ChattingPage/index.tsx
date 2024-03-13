import Chat from '@/components/Chat';
import Loading from '@/components/Loading';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface RouterState {
  chatRoomId: number;
}

const ChattingPage = () => {
  // const params = useParams();
  const location = useLocation();
  // const chatRoomId = params.id;
  const chatRoomId = (location.state as RouterState).chatRoomId;
  const navigation = useNavigate();
  const userInfo = async () => {
    const response = axios.get('/users');
    return (await response).data;
  };
  console.log(chatRoomId);

  const { data, isFetching, isLoading, error } = useQuery('userInfo', userInfo);
  if (!isFetching && !data) {
    return navigation('/login');
  }
  if (isLoading) return <Loading />;
  return (
    <>
      <Chat chatRoomId={chatRoomId} data={data!} />
    </>
  );
};

export default ChattingPage;
