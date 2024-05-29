
const createWebSocket = () => {
  const ws =  new WebSocket(`ws://api.illrreumbow.store/community/chattings`);
  ws.onopen = () => {
    console.log('WebSocket connection succeed');
  };
  return ws;
};

export default createWebSocket;