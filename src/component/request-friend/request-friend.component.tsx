import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPeopleRequestRequest,
  getUserByIdRequest,
} from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';
import { FriendItem } from '../../redux/types/UserTypes';
import './request-friend.styles.scss';

type Data = {
  userFrom: string;
  userTo: string;
};

const RequestFriend = () => {
  const dispatch = useDispatch();

  const { userCurrent, peopleRequest }: any = useSelector<RootState>(
    (state) => state.user
  );
  const { socket }: any = useSelector<RootState>((state) => state);

  useEffect(() => {
    dispatch(getAllPeopleRequestRequest(userCurrent._id));
  }, [userCurrent, dispatch]);

  const handleAcceptFriend = (item: FriendItem) => {
    const data = { userFrom: userCurrent._id, userTo: item.idUser._id };
    socket.emit('acceptAddFriend', data);

    // dispatch(getUserByIdRequest(item.idUser._id));
  };

  const handleDontAcceptFriend = (item: FriendItem) => {
    const data = { userFrom: userCurrent._id, userTo: item.idUser._id };
    socket.emit('deniedAddFriend', data);

    // dispatch(getUserByIdRequest(item.idUser._id));
  };

  return (
    <div className="request">
      <div className="title">
        <span>Danh sách kết bạn</span>
      </div>
      <div className="list">
        <div className="list_title">
          <span>
            Lời mời kết bạn
            {/* ({`${userCurrent.peopleRequest.length}`}) */}
          </span>
        </div>

        {peopleRequest
          ? peopleRequest.map((item: FriendItem) => (
              <div className="list_item" key={item._id}>
                <div className="avatar">
                  <img src={item.idUser.avatar} alt=""></img>
                </div>
                <div className="name">
                  <span>{item.idUser.name}</span>
                </div>
                <div className="btn">
                  <button
                    className="delete"
                    onClick={() => handleDontAcceptFriend(item)}
                  >
                    Bỏ qua
                  </button>
                  <button
                    className="accept"
                    onClick={() => handleAcceptFriend(item)}
                  >
                    Đồng ý
                  </button>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default RequestFriend;
