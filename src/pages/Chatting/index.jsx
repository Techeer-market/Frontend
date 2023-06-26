var socket = new WebSocket('ws://localhost:8080/ws/chat');

socket.onopen = function () {
  console.log('WebSocket connection opened.');

  //response 데이터 받아오기
  var response = {
    productId: 1,
    // "roomId":randomUUID();
    name: 'test',
    sessions: [],
  };

  // WebSocket에 메시지 전송
  var message = {
    type: 'TALK', // TALK
    roomId: '78db4907-4a44-4eb7-bce1-7f74ebad724d',
    sender: response.name,
    message: '안녕하세요',
  };
  socket.send(JSON.stringify(message));
};

socket.onmessage = function (event) {
  var message = JSON.parse(event.data);

  // 메시지 처리 로직 작성
  switch (message.type) {
    case 'ENTER':
      handleEnterMessage(message);
      break;
    case 'TALK':
      handleTalkMessage(message);
      break;
    default:
      console.log('Unknown message type:', message.type);
  }
};

socket.onclose = function (event) {
  console.log(
    'WebSocket connection closed with code:',
    event.code,
    'reason:',
    event.reason,
  );
};

// 입장 메시지 처리 함수
function handleEnterMessage(message) {
  console.log('Enter message received:', message);
  // 입장 메시지 처리 로직 작성
}

// 대화 메시지 처리 함수
function handleTalkMessage(message) {
  console.log('Talk message received:', message);
  // 대화 메시지 처리 로직 작성
}
