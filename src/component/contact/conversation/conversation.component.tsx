import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  saveInfoChatGroup,
  saveInfoChatWith,
} from '../../../redux/actions/ChatAction';
import { showChat } from '../../../redux/actions/OptionLayoutAction';
import { RootState } from '../../../redux/reducers';
import { Conversation, Group, User } from '../../../redux/types/ChatTypes';
import './conversation.styles.scss';

const Conversations = () => {
  const dispatch = useDispatch();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { listConversation, listMessage }: any = useSelector<RootState>(
    (state) => state.chat
  );
  const { socket }: any = useSelector<RootState>((state) => state);
  // console.log(chatWith);
  // useEffect(() => {
  //   const arrIdConversation: string[] = [];
  //   listConversation.map((item: Conversation) =>
  //     arrIdConversation.push(item._id)
  //   );
  //   socket.emit('join_all_conversation', arrIdConversation);
  // }, [listConversation]);
  useEffect(() => {
    console.log(1, userCurrent._id);
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, [userCurrent]);

  useEffect(() => {
    socket.on('createGroupSuccess', (data: string) => {
      console.log(3, data);
      dispatch(getAllConversationByUserRequest(data));
      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });
    socket.on('createGroupToClient', (data: string) => {
      console.log(2, data);
      dispatch(getAllConversationByUserRequest(data));
      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });

    socket.on('addMemberToGroupToClient', (data: string) => {
      console.log(2, data);
      dispatch(getAllConversationByUserRequest(data));
      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });

    socket.on('kickMemberOutGroupToClient', (data: string) => {
      dispatch(getAllConversationByUserRequest(data));
    });

    socket.on('seen_message', () => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });
  }, []);
  socket.on('kickMemberOutGroupToClient', (data: string) => {
    console.log(4, data);

    dispatch(getAllConversationByUserRequest(data));
  });
  socket.on('addMemberToGroupToClient', (data: string) => {
    console.log(3, data);
    dispatch(getAllConversationByUserRequest(data));
    // dispatch(getAllPeopleRequestRequest(data.userFrom));
  });
  socket.on('leaveGroupSuccess', (data: string) => {
    console.log(3, data);
    dispatch(getAllConversationByUserRequest(data));
    // dispatch(getAllPeopleRequestRequest(data.userFrom));
  });

  useEffect(() => {
    socket.on('new_message', () => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });
  });

  const handleChat = (item: User, idConversation: string) => {
    const newStateChatWith = {
      _id: '',
      idUser: item.idUser,
      idConversation: idConversation,
      type: 'single',
    };
    console.log('click2');
    // console.log(idConversation);

    dispatch(getAllMessageByConversationRequest(idConversation));
    dispatch(saveInfoChatWith(newStateChatWith));
    dispatch(showChat());
    socket.emit('seen_message', idConversation);
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
    // console.log(idConversation);
    console.log('click1');

    dispatch(getAllMessageByConversationRequest(idConversation));
    dispatch(saveInfoChatWith(newStateChatGroup));
    dispatch(showChat());
    socket.emit('seen_message', idConversation);
  };

  const renderSingleConversation = (conversation: Conversation) => {
    const chatWithUser = conversation.members.filter(
      (item: User) => item.idUser._id !== userCurrent._id
    )[0];

    return (
      <div
        className="conversations_item"
        onClick={() => handleChat(chatWithUser, conversation._id)}
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
                    className={
                      conversation.lastMessage
                        ? `lastmessage`
                        : `lastmessage not_seen`
                    }
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
    return (
      <div
        className="conversations_item"
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
                    className={
                      conversation.lastMessage
                        ? 'lastmessage'
                        : `lastmessage not_seen`
                    }
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
