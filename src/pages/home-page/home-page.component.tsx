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
import { getAllConversationByUserRequest } from '../../redux/actions/ChatAction';
import { GroupItem } from '../../redux/types/UserTypes';
type Data = {
  userFrom: string;
  userTo: string;
};
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
  console.log(userCurrent);

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

    socket.on('requestAddFriendToClient', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    socket.on('deniedAddFriendToClient', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    socket.on('acceptAddFriendSuccess', (data: Data) => {
      dispatch(getUserByIdRequest(data.userFrom));
      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });

    socket.on('acceptAddFriendToClient', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    // socket.on('createGroupSuccess', (data: string) => {
    //   dispatch(getUserByIdRequest(data));

    //   // dispatch(getAllPeopleRequestRequest(data.userFrom));
    // });
    // socket.on('createGroupToClient', (data: GroupItem) => {
    //   // dispatch(getUserByIdRequest(data));
    //   dispatch(getAllConversationByUserRequest(userCurrent._id));

    //   // for (const user of data.members) {
    //   //   dispatch(getAllConversationByUserRequest(user.idUser._id));
    //   // }
    //   // dispatch(getAllPeopleRequestRequest(data.userFrom));
    // });

    // socket.on('kickMemberOutGroupToClient', (conversation: GroupItem) => {
    //   dispatch(getAllConversationByUserRequest(userCurrent._id));
    // });
    // socket.on('kickMemberOutGroupToDeleteUser', (data: string) => {
    //   dispatch(getAllConversationByUserRequest(data));
    // });

    socket.on('cancelRequestAddFriendSuccess', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    // socket.on('acceptAddFriendToClient', (data: Data) => {
    //   dispatch(getUserByIdRequest(data.userTo));
    // });

    // ------ ACCEPT A REQUEST
    // socket.on('accept_request_friend_success', (idUser: string) => {
    //   dispatch(getUserByIdRequest(idUser));
    // });
    // socket.on('accept_request_friend', (idUser: string) => {
    //   dispatch(getUserByIdRequest(idUser));
    // });

    // ------ DONT ACCEPT A REQUEST
    // socket.on('dont_accept_request_friend_success', (idUser: string) => {

    //   dispatch(getUserByIdRequest(idUser));
    // });
    // socket.on('dont_accept_request_friend', (idUser: string) => {

    //   dispatch(getUserByIdRequest(idUser));
    // });

    // socket.on('leaveGroupToClient', (data: GroupItem) => {
    //   dispatch(getAllConversationByUserRequest(userCurrent._id));

    //   // for (const user of data.members) {
    //   //   dispatch(getAllConversationByUserRequest(user.idUser._id));
    //   // }
    // });

    // ------ DONT ACCEPT A REQUEST
    socket.on('un_friend_success', (idUser: string) => {
      dispatch(getUserByIdRequest(idUser));
    });
    socket.on('un_friend', (idUser: string) => {
      dispatch(getUserByIdRequest(idUser));
    });

    //------ JOIN CONVERSATION
    // socket.on('join_conversation', (idConversation: string) => {});

    // socket.on('newMessage', () => {
    //   dispatch(getAllConversationByUserRequest(userCurrent._id));
    // });
  }, [userCurrent]);

  useEffect(() => {
    socket.on('changeAvatarGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('changeAvatarGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('changeNameGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('changeNameGroupToClient');
  }, [userCurrent]);
  useEffect(() => {
    socket.on('changeLeaderToClient', (data: GroupItem) => {
      console.log('changeLeaderToClient', data);
      // for(const member for data.members)
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('changeLeaderToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('deleteGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('deleteGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('leaveGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('leaveGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToClient', (conversation: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });

    return () => socket.off('kickMemberOutGroupToClient');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('kickMemberOutGroupToDeleteUser', (data: string) => {
      dispatch(getAllConversationByUserRequest(data));
    });
    return () => socket.off('kickMemberOutGroupToDeleteUser');
  }, [userCurrent]);

  useEffect(() => {
    socket.on('addMemberToGroupToClient', (data: GroupItem) => {
      dispatch(getAllConversationByUserRequest(userCurrent._id));
    });
    return () => socket.off('addMemberToGroupToClient');
  }, [userCurrent]);

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
        ) : (
          ''
        )}
        {showFriends ? <RequestFriend></RequestFriend> : ''}
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
