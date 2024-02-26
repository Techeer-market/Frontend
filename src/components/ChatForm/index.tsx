import { useState, useEffect } from 'react';
import * as S from './style';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import { ResChatMessage } from '@/types/chatList';

interface ChatFormProps {
  items: ResChatMessage[];
}
export default function ChatForm({ items }: ChatFormProps) {
  const [chatList, setChatList] = useState<ResChatMessage[]>([]);
  const navigate = useNavigate();
  const goToChatRoom = () => {
    navigate('/chat/room');
  };

  useEffect(() => {
    setChatList(chatList);
  }, []);

  return (
    <S.Container>
      {items.map((item, idx) => (
        <S.Div onClick={goToChatRoom} key={idx}>
          <S.Icon>
            <S.IconImage src={profile} />
          </S.Icon>
          <S.Texts>
            <S.TopText>
              <S.NameText>{item.chatPartnerName}</S.NameText>
              <S.DayText>3일전</S.DayText>
            </S.TopText>
            <S.Chat>넵 수고염</S.Chat>
          </S.Texts>
          <S.ProductImage src={item.productThumbnail} />
        </S.Div>
      ))}
    </S.Container>
  );
}
