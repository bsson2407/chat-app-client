import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  saveInfoChatWith,
} from '../../../redux/actions/ChatAction';
import { showChat } from '../../../redux/actions/OptionLayoutAction';
import { RootState } from '../../../redux/reducers';
import { Conversation, User } from '../../../redux/types/ChatTypes';
import './list-friend.styles.scss';
const ListFriend = () => {
  const dispatch = useDispatch();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { listConversation, listMessage }: any = useSelector<RootState>(
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

  // useEffect(() => {
  //   socket.on('new_message', () => {
  //     dispatch(getAllConversationByUserRequest(userCurrent._id));
  //   });
  // });

  // useEffect(() => {
  //   socket.on('seen_message', () => {
  //     dispatch(getAllConversationByUserRequest(userCurrent._id));
  //   });
  // }, []);

  useEffect(() => {
    dispatch(getAllConversationByUserRequest(userCurrent._id));
  }, [userCurrent, listMessage]);

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
    socket.emit('seen_message', idConversation);
  };

  const renderSingleConversation = () => {
    const test = listConversation.sort((a: Conversation, b: Conversation) => {
      const aUser = a.members.filter(
        (item: User) => item.idUser._id !== userCurrent._id
      )[0];
      const bUser = b.members.filter(
        (item: User) => item.idUser._id !== userCurrent._id
      )[0];
      console.log(aUser.idUser.name > bUser.idUser.name);
      return aUser.idUser.name > bUser.idUser.name;

      // a.members.filter((item: User) => item.idUser._id !== userCurrent._id)[0]
      //   .idUser.name >
      //   b.members.filter((item: User) => item.idUser._id !== userCurrent._id)[0]
      //     .idUser.name;
    });
    return <div>test</div>;
    // const chatWithUser = conversation.members.filter(
    //   (item: User) => item.idUser._id !== userCurrent._id
    // )[0];
    // return (
    //   <div
    //     className="conversations_item"
    //     onClick={() => handleChat(chatWithUser, conversation._id)}
    //   >
    //     <div className="avatar">
    //       <img src={chatWithUser.idUser.avatar}></img>
    //     </div>
    //     <div className="main">
    //       <div className="main_top">
    //         <div className="name">{chatWithUser.idUser.name}</div>
    //       </div>
    //     </div>
    //   </div>
    // );
  };

  const renderSingleSortConversation = (conversation: Conversation) => {
    const chatWithUser = conversation.members.filter(
      (item: User) => item.idUser._id !== userCurrent._id
    )[0];
    // console.log(chatWithUser);

    return (
      <div
        className="conversations_item"
        onClick={() => handleChat(chatWithUser, conversation._id)}
      >
        <div className="avatar">
          <img src={chatWithUser.idUser.avatar}></img>
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
    <div className="conversations">
      {listConversation.map((conversation: Conversation) => {
        return (
          <div key={conversation._id}>
            {conversation.type === 'single'
              ? renderSingleSortConversation(conversation)
              : ''}
          </div>
        );
      })}
      {/* {renderSingleConversation()} */}
    </div>
  );
};

export default ListFriend;
