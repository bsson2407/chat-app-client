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
import { ActionTypes } from '../../redux/types/ActionTypes';
import { useNavigate } from 'react-router-dom';
import GroupProfile from '../../component/chat/chat-header/group-profile/groupprofile.component';
import {
  getAllMessageByConversationRequest,
  getConversationByIdRequest,
  saveInfoChatWith,
} from '../../redux/actions/ChatAction';
import { async } from '@firebase/util';
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
  // console.log(chatWith);
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

    // ------ HAVE A NEW REQUEST FRIEND
    // socket.on('add_friend_success', (idUser: string) => {
    //   console.log('add_friend_success');
    //   dispatch(getUserByIdRequest(idUser));
    // });
    // socket.on('new_request_friend', (idUser: string) => {
    //   console.log('new_request_friend');
    //   dispatch(getUserByIdRequest(idUser));
    // });

    // ------ DELETE A NEW REQUEST
    // socket.on('person_delete_request_friend', (idUser: string) => {
    //   console.log('person_delete_request_friend');

    //   dispatch(getUserByIdRequest(idUser));
    // });
    socket.on('requestAddFriendToClient', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    socket.on('deniedAddFriendToClient', (data: Data) => {
      dispatch(getUserByIdRequest(data.userTo));
    });

    socket.on('acceptAddFriendSuccess', (data: Data) => {
      // console.log(data.userTo);
      dispatch(getUserByIdRequest(data.userFrom));
      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });

    socket.on('acceptAddFriendToClient', (data: Data) => {
      console.log(data.userTo);
      dispatch(getUserByIdRequest(data.userTo));
    });

    socket.on('createGroupSuccess', (data: string) => {
      console.log(data);
      dispatch(getUserByIdRequest(data));

      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });
    socket.on('createGroupToClient', (data: string) => {
      console.log(data);
      dispatch(getUserByIdRequest(data));

      // dispatch(getAllPeopleRequestRequest(data.userFrom));
    });

    socket.on('cancelRequestAddFriendSuccess', (data: Data) => {
      console.log('cancelRequestAddFriendSuccess');
      dispatch(getUserByIdRequest(data.userTo));
    });

    // socket.on('acceptAddFriendToClient', (data: Data) => {
    //   console.log(data.userTo);
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
    //   console.log('dont_accept_request_friend_success');

    //   dispatch(getUserByIdRequest(idUser));
    // });
    // socket.on('dont_accept_request_friend', (idUser: string) => {
    //   console.log('dont_accept_request_friend');

    //   dispatch(getUserByIdRequest(idUser));
    // });

    // ------ DONT ACCEPT A REQUEST
    socket.on('un_friend_success', (idUser: string) => {
      dispatch(getUserByIdRequest(idUser));
    });
    socket.on('un_friend', (idUser: string) => {
      dispatch(getUserByIdRequest(idUser));
    });

    //------ JOIN CONVERSATION
    socket.on('join_conversation', (idConversation: string) => {
      console.log(idConversation);
    });
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
