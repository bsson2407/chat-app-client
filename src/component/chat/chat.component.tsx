import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

import './chat.styles.scss';
import ChatHeader from './chat-header/chatheader.component';
import ChatMain from './chat-main/chatmain.component';
import ChatFooter from './chat-footer/chatfooter.component';
import OtherProfile from './chat-header/other-profile/otherprofile.component';
// import Message from './Chat_main/Message'
// import TypeMessage from './TypeMessage/TypeMessage'

const Chat = () => {
  // const { onOPClick } = props;

  const { chatWith }: any = useSelector<RootState>((state) => state.chat);

  return (
    <>
      {chatWith ? (
        <div className="chat">
          <ChatHeader></ChatHeader>
          <ChatMain></ChatMain>
          <ChatFooter></ChatFooter>
        </div>
      ) : (
        ''
      )}

      {/* {chatGroup ? (
        <div className="chat">
          <GroupChatHeader></GroupChatHeader>
          <GroupChatMain></GroupChatMain>
          <GroupChatFooter></GroupChatFooter>
        </div>
      ) : (
        ''
      )} */}
    </>
  );
};

export default Chat;
