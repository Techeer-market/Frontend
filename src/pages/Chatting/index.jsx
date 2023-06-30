import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const index = () => {
  const [messageInput, setMessageInput] = useState('');
  const [sender, setSender] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지들을 저장하는 배열 추가

  const socket = new WebSocket('ws://localhost:8080/ws/chat');

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket connection opened.');

      const email = 'dayon@gmail.com';
      const productUuid = 'c409c6f7-699e-40f9-bb2a-ccc93e63d927';

      axios
        .post(
          `http://localhost:8080/chat?email=${email}&productUuid=${productUuid}`,
        )
        .then((response) => {
          console.log('API response:', response.data);

          var enterMessage = {
            productUuid: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
            type: 'ENTER',
            roomId: '1',
            sender: '',
            time: '',
            message: '입장 완료',
          };
          socket.send(JSON.stringify(enterMessage));
        })
        .catch((error) => {
          console.error('API request error:', error);
        });
    };
  }, []);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setSender(message.sender);
    setReceiveMessage(message.message);
    setChatMessages((prevMessages) => [...prevMessages, message]); // 받은 메시지를 채팅 메시지 배열에 추가
    console.log('message : ', message);
  };

  socket.onclose = (event) => {
    console.log(
      'WebSocket connection closed with code:',
      event.code,
      'reason:',
      event.reason,
    );
  };

  const handleSendMessage = () => {
    var message = {
      productUuid: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
      type: 'TALK',
      roomId: '1',
      sender: '임성한',
      time: '',
      message: messageInput,
    };
    socket.send(JSON.stringify(message));
    // setSender(message.sender);
    // setReceiveMessage(message.message);
    // setChatMessages((prevMessages) => [...prevMessages, message]); // 보낸 메시지를 채팅 메시지 배열에 추가
    setMessageInput('');
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {chatMessages.map((message, index) => (
          <MessageBubble key={index}>
            <SenderName>{message.sender}</SenderName>
            {message.message}
          </MessageBubble>
        ))}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="메시지를 입력하세요"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageBubble = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const SenderName = styled.span`
  font-weight: bold;
  margin-right: 5px;
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

export default index;
