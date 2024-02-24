import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import NavBar from '@/components/NavBar';
import ChatForm from '@/components/ChatForm';
import Chat from '@/components/Chat';
const ChatList = () => {
  return (
    <>
      <TopNavBar page="채팅 목록" />
      <NavBar />
      <ChatForm />
      <Chat />
    </>
  );
};

export default ChatList;
