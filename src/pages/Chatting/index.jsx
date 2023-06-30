import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const index = () => {
  const socket = new WebSocket('ws://localhost:8080/ws/chat');
  socket.onopen = () => {
    console.log('WebSocket connection opened.');

    // Response 데이터 받아오기
    const response = {
      productUuid: '',
      // "roomId": randomUUID();
      name: 'test',
      sessions: [],
    };

    // WebSocket에 메시지 전송
    var message = {
      productId: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
      type: 'TALK', // ENTER
      roomId: '1',
      sender: '',
      message: 'ㅎㅇ',
      // email: 'dayon@gmail.com',
      time: '',
    };
    socket.send(JSON.stringify(message));

    // // API 요청 보내기
    var email = 'dayon@gmail.com';
    var productId = 'c409c6f7-699e-40f9-bb2a-ccc93e63d927';

    // 방만드는곳
    axios
      .post(`http://localhost:8080/chat?email=${email}&productId=${productId}`)
      .then((response) => {
        console.log('API response:', response.data);

        // API 응답 처리 로직 작성
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    // 메시지 처리 로직 작성
    switch (message.type) {
      // case 'ENTER':
      //   handleEnterMessage(message);
      //   break;
      case 'TALK':
        handleTalkMessage(message);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  socket.onclose = (event) => {
    console.log(
      'WebSocket connection closed with code:',
      event.code,
      'reason:',
      event.reason,
    );
  };

  // 입장 메시지 처리 함수
  // const handleEnterMessage = (message) => {
  //   console.log('Enter message received:', message);
  //   // 입장 메시지 처리 로직 작성
  // };

  // 대화 메시지 처리 함수
  const handleTalkMessage = (message) => {
    console.log('Talk message received:', message);
    // 대화 메시지 처리 로직 작성
  };

  const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  const ChatMessages = styled.div`
    flex: 1;
    overflow-y: auto;
  `;

  const MessageBubble = styled.div`
    background-color: #f2f2f2;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  `;

  const ChatInput = styled.input`
    padding: 10px;
    border: none;
    border-top: 1px solid #ccc;
    outline: none;
  `;

  return (
    <ChatContainer>
      <ChatMessages>
        <MessageBubble>안녕하세요!</MessageBubble>
        <MessageBubble>반갑습니다.</MessageBubble>
        {/* 채팅 메시지들을 동적으로 렌더링 */}
      </ChatMessages>
      <ChatInput type="text" placeholder="메시지를 입력하세요" />
    </ChatContainer>
  );
};

export default index;
