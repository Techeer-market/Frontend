// import Chat from '@/components/ChatContent/Chat';
// import Loading from '@/components/Loading';
// import * as S from '@/pages/ChattingPage/styles';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { useNavigate, useParams } from 'react-router-dom';

// export const userInfo = async () => {
//   const response = await axios.get('/users');
//   console.log(response.data);
//   return response.data;
// };

// const index = () => {
//   const params = useParams();
//   const chatRoomId = params.id || '';
//   const navigation = useNavigate();
//   const { data, isFetching, isLoading } = useQuery('userInfo', userInfo);
//   if (!isFetching && !data) {
//     return navigation('/login');
//   }
//   if (isLoading) return <Loading />;
//   return <Chat chatRoomId={chatRoomId} />;
// };

// export default index;
