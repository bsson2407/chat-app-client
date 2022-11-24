import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  saveInfoChatWith,
} from '../../../redux/actions/ChatAction';
import { showChat } from '../../../redux/actions/OptionLayoutAction';
import { RootState } from '../../../redux/reducers';
import { Conversation, Group, User } from '../../../redux/types/ChatTypes';
import './conversation.styles.scss';

const Conversations = () => {
  const dispatch = useDispatch();
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);

  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { listConversation }: any = useSelector<RootState>(
    (state) => state.chat
  );
  const { socket }: any = useSelector<RootState>((state) => state);
  useEffect(() => {
    const arrIdConversation: string[] = [];
    listConversation.map((item: Conversation) =>
      arrIdConversation.push(item._id)
    );
    socket.emit('join_all_conversation', arrIdConversation);
  }, [listConversation]);

  useEffect(() => {
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, [userCurrent]);

  const handleChat = (item: User, conversation: Conversation) => {
    const newStateChatWith = {
      _id: '',
      idUser: item.idUser,
      idConversation: conversation._id,
      type: 'single',
    };

    dispatch(getAllMessageByConversationRequest(conversation._id));
    dispatch(saveInfoChatWith(newStateChatWith));
    dispatch(showChat());
  };

  const handleChatGroup = (item: Group, idConversation: string) => {
    const newStateChatGroup = {
      _id: '',
      name: item.name,
      avatar: item.avatar,
      leaderId: item.leaderId,
      members: item.members,
      idConversation: idConversation,
      type: 'group',
    };

    dispatch(getAllMessageByConversationRequest(idConversation));
    dispatch(saveInfoChatWith(newStateChatGroup));
    dispatch(showChat());
  };

  const renderSingleConversation = (conversation: Conversation) => {
    const chatWithUser = conversation.members.filter(
      (item: User) => item.idUser._id !== userCurrent._id
    )[0];

    const flag = conversation.lastMessage
      ? conversation.lastMessage.seen.includes(userCurrent._id)
      : false;

    return (
      <div
        className={
          chatWith
            ? chatWith.idConversation === conversation._id
              ? 'conversations_item_active'
              : 'conversations_item'
            : 'conversations_item'
        }
        onClick={() => handleChat(chatWithUser, conversation)}
      >
        <div className="avatar" key={conversation._id}>
          <img src={chatWithUser.idUser.avatar} alt="avatar"></img>
        </div>
        <div className="main">
          <div className="main_top">
            <div className="name">{chatWithUser.idUser.name}</div>
          </div>
          {conversation === undefined ? (
            ''
          ) : (
            <div className="main_bottom">
              {/* // CHECK USER NAO GUI TIN NHAN & CHECK SEEN TRUE OR FALSE */}
              {conversation.lastMessage ? (
                conversation.lastMessage.sender === userCurrent._id ? (
                  <div className="lastmessage">
                    Bạn: {conversation.lastMessage.message}
                  </div>
                ) : conversation.lastMessage ? (
                  <div
                    className={flag ? `lastmessage` : `lastmessage not_seen`}
                  >
                    {conversation.lastMessage.message}
                  </div>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              {!conversation.lastMessage ? (
                <div className="newmessage"></div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGroupConversation = (conversation: Conversation) => {
    const flag = conversation.lastMessage
      ? conversation.lastMessage.seen.includes(userCurrent._id)
      : false;
    return (
      <div
        className={
          chatWith
            ? chatWith.idConversation === conversation._id
              ? 'conversations_item_active'
              : 'conversations_item'
            : 'conversations_item'
        }
        onClick={() => {
          handleChatGroup(conversation, conversation._id);
        }}
      >
        <div className="avatar" key={conversation._id}>
          <img src={conversation.avatar} alt="avatar"></img>
        </div>
        <div className="main">
          <div className="main_top">
            <div className="name">{conversation.name}</div>
          </div>
          {conversation === undefined ? (
            ''
          ) : (
            <div className="main_bottom">
              {conversation.lastMessage ? (
                // CHECK USER NAO GUI TIN NHAN & CHECK SEEN TRUE OR FALSE
                conversation.lastMessage.sender === userCurrent._id ? (
                  <div className="lastmessage">
                    Bạn: {conversation.lastMessage.message}
                  </div>
                ) : (
                  <div
                    className={flag ? 'lastmessage' : `lastmessage not_seen`}
                  >
                    {conversation.lastMessage.message}
                  </div>
                )
              ) : (
                ''
              )}
              {!conversation.lastMessage ? (
                <div className="newmessage"></div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="conversations">
      {listConversation.map((conversation: Conversation) => {
        return (
          <div key={conversation._id}>
            {conversation.type === 'group'
              ? renderGroupConversation(conversation)
              : conversation.type === 'single'
              ? renderSingleConversation(conversation)
              : ''}
          </div>
        );
      })}
    </div>
  );
};

export default Conversations;
