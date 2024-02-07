import React, { useCallback, useRef } from 'react';
import * as Stomp from '@stomp/stompjs';

const Chat = () => {
  const client = useRef<Stomp.Client>();
  const connect = useCallback(() => {
    console.log('Connecting to:', 'ws://localhost:8080/ws');
    client.current = new Stomp.Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: localStorage.getItem('token') || '',
      },
      onConnect: () => {
        console.log('연결성공');
      },
    });
    client.current.activate();
  }, []);
  const disconnect = () => {
    client.current?.deactivate();
  };
  return <div></div>;
};

export default Chat;
