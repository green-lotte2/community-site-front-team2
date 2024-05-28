
const createWebSocket = () => {
  const ws =  new WebSocket(`ws://localhost:8080/community/chattings`);
  ws.onopen = () => {
    console.log('WebSocket connection succeed');
  };
  return ws;
};

export default createWebSocket;