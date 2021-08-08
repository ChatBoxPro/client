import { createContext } from "react";
import socketio from "socket.io-client";
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:5000/";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
