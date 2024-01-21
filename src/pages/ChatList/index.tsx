import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import NavBar from '@/components/NavBar';
import ChatForm from '@/components/ChatForm';

const index = () => {
  return (
    <>
      <TopNavBar page="채팅 목록" />
      <NavBar />
      <ChatForm productId={18} roomName={''} />
    </>
  );
};

export default index;
