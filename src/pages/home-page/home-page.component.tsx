import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Chat from '../../component/chat/chat.component';
import Contact from '../../component/contact/contact.component';
import Navbar from '../../component/navbar/navbar.component';
import RequestFriend from '../../component/request-friend/request-friend.component';
import { RootState } from '../../redux/reducers';
import './home-page.styles.scss';
import {
  getNewTokenRequest,
  getUserByIdRequest,
} from '../../redux/actions/UserAction';
import OtherProfile from '../../component/chat/chat-header/other-profile/otherprofile.component';
import { useNavigate } from 'react-router-dom';
import GroupProfile from '../../component/chat/chat-header/group-profile/groupprofile.component';
import {
  getAllConversationByUserRequest,
  getAllMessageByConversationRequest,
  pushNewMesssgeToListMessage,
  saveInfoChatWith,
} from '../../redux/actions/ChatAction';
import { GroupItem } from '../../redux/types/UserTypes';
import { IMessage } from '../../redux/types/ChatTypes';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();

  const tokenLocalStorage = localStorage.getItem('token');
  const refeshTokenLocalStorage = localStorage.getItem('refeshToken');

  const { showChat, showFriends, showOtherProfile, showGroupProfile }: any =
    useSelector<RootState>((state) => state.optionLayout);
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  // const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { socket }: any = useSelector<RootState>((state) => state);
  // const [othProfile, setOthProfile] = useState<boolean>(false);

  // const handleOtherProfile = (): void => {
  //   setOthProfile(!othProfile);
  // };

  useEffect(() => {
    if (tokenLocalStorage === null || refeshTokenLocalStorage === null) {
      navigate('/login');
      // history.push('/login');
    } else {
      const token: string = tokenLocalStorage.slice(
        1,
        tokenLocalStorage.length - 1
      );
      const refeshToken: string = refeshTokenLocalStorage.slice(
        1,
        tokenLocalStorage.length - 1
      );
      const decoded: any = jwt_decode(token);
      dispatch(getUserByIdRequest(decoded._id));
      if (decoded.exp < Date.now() / 1000) {
        dispatch(getNewTokenRequest({ refeshToken }));
      }
    }
  }, []);

  useEffect(() => {
    // ------ JOIN ROOM
    socket.emit('join_room', userCurrent);
  }, [userCurrent]);
  useEffect(() => {
    socket.on('requestAddFriendToClient', (data: any) => {
      dispatch(getUserByIdRequest(userCurrent._id));
      return () => socket.off('requestAddFriendToClient');
    });
  }, [userCurrent]);

  useEffect(() => {
    socket.on('deniedAddFriendToClient', (data: any) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('deniedAddFriendToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('acceptAddFriendToClient', (data: any) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('acceptAddFriendToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('cancelRequestAddFriendToClient', (data: any) => {
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    return () => socket.off('cancelRequestAddFriendToClient');
  }, [userCurrent]);

  // useEffect(() => {
  //   socket.on('newMessage', (data: any) => {
  //     dispatch(getAllConversationByUserRequest(userCurrent._id));
  //     dispatch(getAllMessageByConversationRequest(data._id));
  //     // dispatch(saveInfoChatWith(data));
  //   });

  //   return () => socket.off('newMessage');
  // }, [userCurrent]);

  useEffect(() => {
    socket.on('newMessage', (newMessage: IMessage) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === newMessage.idConversation) {
        dispatch(pushNewMesssgeToListMessage(newMessage));
      }
    });

    return () => socket.off('newMessage');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('seenMessageToClient', (data: any) => {
      console.log('seenMessageHome');
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        console.log('seenMessageHomeRequest');
        dispatch(getAllMessageByConversationRequest(data.idConversation));
      }
    });

    return () => socket.off('seenMessageToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('changeAvatarGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));

      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeAvatarGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('changeNameGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeNameGroupToClient');
  }, [userCurrent, chatWith]);
  useEffect(() => {
    socket.on('changeLeaderToClient', (data: GroupItem) => {
      console.log('changeLeaderToClient', data);
      // for(const member for data.members)
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('changeLeaderToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('deleteGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('deleteGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('unFriendToClient', (data: any) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      dispatch(getUserByIdRequest(userCurrent._id));
    });

    return () => socket.off('unFriendToClient');
  }, [userCurrent]);
  useEffect(() => {
    socket.on('leaveGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('leaveGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToClient', (data: GroupItem) => {
      console.log('kickMemberOutGroupToClient', userCurrent._id);

      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });

    return () => socket.off('kickMemberOutGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToDeleteUser', (data: string) => {
      dispatch(getAllConversationByUserRequest(data));
    });
    return () => socket.off('kickMemberOutGroupToDeleteUser');
  }, [userCurrent]);
  useEffect(() => {
    socket.on('addMemberToGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
      if (chatWith.idConversation === data.idConversation) {
        dispatch(getAllMessageByConversationRequest(data._id));
        dispatch(saveInfoChatWith(data));
      }
    });
    return () => socket.off('addMemberToGroupToClient');
  }, [userCurrent, chatWith]);

  useEffect(() => {
    socket.on('createGroupToClient', (data: GroupItem) => {
      console.log('createGroupToClient');
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });
    return () => socket.off('createGroupToClient');
  }, [userCurrent]);

  return (
    <div className="homepage">
      <div className="homepage-navbar">
        <Navbar></Navbar>
      </div>
      <div className="homepage-contact">
        <Contact></Contact>
      </div>
      <main className="homepage-main">
        {showChat ? (
          <Chat
          // onOPClick={handleOtherProfile}
          ></Chat>
        ) : showFriends ? (
          <RequestFriend></RequestFriend>
        ) : (
          <img className="img-home" src="images/background.png" alt="" />
        )}
      </main>
      {showOtherProfile && chatWith.type === 'single' ? (
        <OtherProfile></OtherProfile>
      ) : null}
      {showGroupProfile && chatWith.type === 'group' ? (
        <GroupProfile></GroupProfile>
      ) : null}
    </div>
  );
};

export default HomePage;
