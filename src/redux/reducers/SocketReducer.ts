/* eslint-disable @typescript-eslint/no-unused-vars */
import { io } from 'socket.io-client';

// const ENDPOINT: string = 'http://localhost:5000';
const ENDPOINT: string = 'https://chap-app-cnmoi.herokuapp.com';
// https://chap-app-cnmoi.herokuapp.com/
let socket: any = null;

export const createSocket = () => {
  if (socket !== null) {
    return socket;
  }
  return (socket = io(ENDPOINT));
};
export const getCurrentSocket = () => {
  return socket;
};
