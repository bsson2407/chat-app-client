/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'socket.io-client';

const ENDPOINT: string = 'http://localhost:5000';
let socket: any = null;

export const createSocket = () => {
  // console.log(io('abc'));

  if (socket !== null) {
    return socket;
  }
  return (socket = io(ENDPOINT));
};
export const getCurrentSocket = () => {
  return socket;
};
