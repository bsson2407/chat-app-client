import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  saveInfoChatWith,
} from '../../../redux/actions/ChatAction';
import { showChat } from '../../../redux/actions/OptionLayoutAction';
import { RootState } from '../../../redux/reducers';
import { Conversation, Group, User } from '../../../redux/types/ChatTypes';
import './list-friend.styles.scss';
const ListFriend = () => {
  const dispatch = useDispatch();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { listConversation }: any = useSelector<RootState>(
    (state) => state.chat
  );

  const [showList, setShowList] = useState(true);

  useEffect(() => {
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, [userCurrent]);

  const handleChat = async (item: User, idConversation: string) => {
    const newStateChatWith = {
      _id: '',
      idUser: item.idUser,
      idConversation: idConversation,
      type: 'single',
    };
    await dispatch(getAllMessageByConversationRequest(idConversation));
    await dispatch(saveInfoChatWith(newStateChatWith));
    await dispatch(showChat());
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

  const renderGroupConversation = (conversation: Conversation) => {
    return (
      <div
        className={'listfriend_item'}
        onClick={() => {
          handleChatGroup(conversation, conversation._id);
        }}
      >
        <div className="avatar" key={conversation._id}>
          <img src={conversation.avatar} alt="avatar"></img>
        </div>
        <div className="main">
          <div className="name">{conversation.name}</div>
        </div>
      </div>
    );
  };

  const renderSingleConversation = (conversation: Conversation) => {
    const chatWithUser = conversation.members.filter(
      (item: User) => item.idUser._id !== userCurrent._id
    )[0];

    return (
      <div
        className="listfriend_item"
        onClick={() => handleChat(chatWithUser, conversation._id)}
      >
        <div className="avatar">
          <img src={chatWithUser.idUser.avatar} alt=""></img>
        </div>
        <div className="main">
          <div className="main_top">
            <div className="name">{chatWithUser.idUser.name}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="listfriend">
      <div
        className={showList ? 'listfriend_item' : 'listfriend_item_active'}
        onClick={() => setShowList(false)}
      >
        <div className="avatar">
          <img
            alt=""
            src="https://media.istockphoto.com/vectors/people-group-avatar-character-vector-id929634052?k=20&m=929634052&s=170667a&w=0&h=B8im2iJZyUOvY-vsNuJSIY3_sD1cnBrEV0gAyyosP3Y="
          ></img>
        </div>
        <div className="main">
          <div className="main_top">
            <div className="name">Danh sách nhóm</div>
          </div>
        </div>
      </div>
      <div
        className={showList ? 'listfriend_item_active' : 'listfriend_item'}
        onClick={() => setShowList(true)}
      >
        <div className="avatar">
          <img
            alt=""
            src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
          ></img>
        </div>
        <div className="main">
          <div className="main_top">
            <div className="name">Danh sách bạn bè</div>
          </div>
        </div>
      </div>
      <hr />
      {listConversation.map((conversation: Conversation) => {
        return (
          <div key={conversation._id}>
            {showList
              ? conversation.type === 'single' &&
                renderSingleConversation(conversation)
              : conversation.type === 'group' &&
                renderGroupConversation(conversation)}
          </div>
        );
      })}
      {/* {renderSingleConversation()} */}
    </div>
  );
};

export default ListFriend;
