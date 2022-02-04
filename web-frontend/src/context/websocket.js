import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8000');
export const SocketContext = React.createContext();
