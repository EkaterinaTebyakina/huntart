import useWebSocket from "react-use-websocket";

export const SOCKET_URL = "ws://localhost:8000/ws/";

// export const {
//   sendMessage,
//   sendJsonMessage,
//   lastMessage,
//   lastJsonMessage,
//   readyState,
//   getWebSocket,
// } = useWebSocket(SOCKET_URL, {
//   onOpen: () => console.log('opened'),
//   //Will attempt to reconnect on all close events, such as server shutting down
//   shouldReconnect: (closeEvent) => true,
//   share: true,
// });

// export const useChatWebsocket = () => {
//   const SOCKET_URL = "ws://localhost:8000/ws/"
//   // const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');

//   const {
//     sendMessage,
//     sendJsonMessage,
//     lastMessage,
//     lastJsonMessage,
//     readyState,
//     getWebSocket,
//   } = useWebSocket(SOCKET_URL, {
//     onOpen: () => console.log('opened'),
//     //Will attempt to reconnect on all close events, such as server shutting down
//     shouldReconnect: (closeEvent) => true,
//     share: true,
//   });

//   return {sendJsonMessage}
// }

