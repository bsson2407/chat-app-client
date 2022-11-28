import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import ForgotPasspage from './pages/forgot-pass-page/forgot-pass-page';
import HomePage from './pages/home-page/home-page.component';
import LoginPage from './pages/login/login-page.component';
import RegisterPage from './pages/register/register-page.component';
import Peer from 'peerjs';
import { RootState } from './redux/reducers';
import { ActionTypes } from './redux/types/ActionTypes';
import CallModal from './component/chat/chat-header/call-modal/call-modal.component';
import NewPasswordPage from './pages/newPassword/newPassword.component';

function App() {
  const dispatch = useDispatch();
  const { user, call, socket }: any = useSelector<RootState>((state) => state);
  useEffect(() => {
    socket.on('callUserToClient', (data: any) => {
      dispatch({ type: ActionTypes.CALL, payload: data });
    });

    return () => socket.off('callUserToClient');
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const newPeer = new Peer('', {
        path: '/',
        secure: false,
        config: {
          iceServers: [
            { urls: ['stun:ss-turn2.xirsys.com'] },
            {
              username:
                'Awknma80yWxQgb3VQgBrQs_iNy-vaysOaDBOZ4xcA2GOLjY_ve-TdzjeCRZWrbrlAAAAAGGac750dWFuYW5oMjU4MjAwMA==',
              credential: '19d8e05c-4ae8-11ec-af6d-0242ac140004',
              urls: [
                'turn:ss-turn2.xirsys.com:80?transport=udp',
                'turn:ss-turn2.xirsys.com:3478?transport=udp',
                'turn:ss-turn2.xirsys.com:80?transport=tcp',
                'turn:ss-turn2.xirsys.com:3478?transport=tcp',
                'turns:ss-turn2.xirsys.com:443?transport=tcp',
                'turns:ss-turn2.xirsys.com:5349?transport=tcp',
              ],
            },
          ],
        },
      });
      dispatch({ type: ActionTypes.PEER, payload: newPeer });
    }
  }, [dispatch, user]);
  return (
    <>
      {call && <CallModal />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpass" element={<ForgotPasspage />} />
        <Route path="/newpass" element={<NewPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
