import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Index = () => {
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws/chat');
    socket.onopen = () => {
      console.log('WebSocket connection opened.');
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

    return () => {
      // 컴포넌트가 언마운트되면 WebSocket 연결 종료
      socket.close();
    };
  }, []);

  // 대화 메시지 처리 함수
  const handleTalkMessage = (message) => {
    console.log('Talk message received:', message);

    // 메세지 받는거 message.message && message.sender 해서 ui에 띄워주기
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') {
      return; // 빈 메시지는 전송하지 않음
    }

    // 메시지 전송 로직
    const socket = new WebSocket('ws://localhost:8080/ws/chat');
    const message = {
      productUuid: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
      type: 'TALK',
      roomId: '1',
      sender: '',
      time: '',
      message: messageInput,
    };
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
      console.log('Message sent:', message);

      // API 요청
      const email = 'dayon@gmail.com';
      const productUuid = 'c409c6f7-699e-40f9-bb2a-ccc93e63d927';

      axios
        .post(
          `http://localhost:8080/chat?email=${email}&productUuid=${productUuid}`,
        )
        .then((response) => {
          console.log('API response:', response.data);
          // API 응답 처리 로직 작성
        })
        .catch((error) => {
          console.error('API request error:', error);
        });
    };

    // 메시지 입력창 초기화
    setMessageInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 엔터키의 기본 동작 방지
      handleSendMessage(); // 메시지 전송 함수 호출
    }
  };

  return (
    <ChatContainer>
      <ChatMessages>
        <MessageBubble>안녕하세요!</MessageBubble>
        <MessageBubble>반갑습니다.</MessageBubble>
        {/* 채팅 메시지들을 동적으로 렌더링 */}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="메시지를 입력하세요"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
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

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  padding: 8px 12px;
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Index;
