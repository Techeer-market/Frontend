import Chat from '@/components/Chat';
import Loading from '@/components/Loading';
import axios from 'axios';
import { response } from 'msw';
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

interface UserInfo {
  chatRoomId: number;
  senderEmail: string;
  createdAt: string;
}

const ChattingPage = () => {
  // const params = useParams<{ id: string }>();
  // const chatRoomId = params.id ? parseInt(params.id, 10) : 0;
  const userInfo = async () => {
    try {
      const response = await axios.get<UserInfo>('/users');
      return response.data.chatRoomId;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isFetching, isLoading } = useQuery('userInfo', userInfo);
  if (!isFetching && !data) {
    return <Navigate to="/login" />;
  }
  if (isLoading) return <Loading />;
  return (
    <>
      <Chat chatRoomId={chatRoomId} data={data!} />
    </>
  );
};

export default ChattingPage;
