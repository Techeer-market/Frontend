import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-chat-elements/dist/main.css';
import { SystemMessage } from 'react-chat-elements';

const index = () => {
  const [messageInput, setMessageInput] = useState('');
  const [sender, setSender] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const socket = new WebSocket('ws://54.180.142.116:8080/ws/chat');

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket connection opened.');
      const email = localStorage.getItem('email');
      const name = localStorage.getItem('name');
      const productUuid = 'c409c6f7-699e-40f9-bb2a-ccc93e63d927';

      console.log({ email });
      console.log({ name });

      axios
        .post(
          `http://54.180.142.116:8080/chat?email=${email}&productUuid=${productUuid}`,
        )
        .then((response) => {
          console.log('API response:', response.data);

          var enterMessage = {
            productUuid: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
            type: 'ENTER',
            roomId: '1',
            sender: name,
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
    setChatMessages((prevMessages) => [...prevMessages, message]);
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
    const name = localStorage.getItem('name');
    var message = {
      productUuid: 'c409c6f7-699e-40f9-bb2a-ccc93e63d927',
      type: 'TALK',
      roomId: '1',
      sender: name,
      time: '',
      message: messageInput,
    };
    socket.send(JSON.stringify(message));
    setMessageInput('');
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {chatMessages.map((message, index) => (
          <MessageContainer key={index} isSent={message.sender === sender}>
            <MessageBubble>
              {message.sender !== sender && (
                <SenderName>{message.sender}</SenderName>
              )}
              {message.message}
            </MessageBubble>
          </MessageContainer>
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

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isSent ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
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
