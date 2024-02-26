// import React, { useCallback, useEffect, useRef } from 'react';
// import * as Stomp from '@stomp/stompjs';

// const Chat = () => {
//   const client = useRef<Stomp.Client>();
//   // const subscribe = useCallback(() => {
//   // client.current?.subscribe(``, b);
//   // }, []);
//   const connect = useCallback(() => {
//     console.log('Connecting to:', 'ws://localhost:8080/ws');
//     client.current = new Stomp.Client({
//       brokerURL: 'ws://localhost:8080/ws',
//       connectHeaders: {
//         Authorization: localStorage.getItem('token') || '',
//       },
//       onConnect: () => {
//         // subscribe
//         console.log('Connected successfully!');
//       },
//     });
//   }, []);

//   const disconnect = () => {
//     client.current?.deactivate();
//   };

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [connect]);
//   return <div></div>;
// };
// export default Chat;
