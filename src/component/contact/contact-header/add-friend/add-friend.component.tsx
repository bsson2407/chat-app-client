/* eslint-disable no-const-assign */
import React, { useEffect } from 'react';
import './add-friend.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { useForm } from 'react-hook-form';
import { Email, Friend } from '../../../../redux/types/UserTypes';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserRequest } from '../../../../redux/actions/UserAction';
import { RootState } from '../../../../redux/reducers';
import { useState } from 'react';
import {
  isFriendAction,
  isMeAction,
  isMyRequestAction,
  isPeopleRequestAction,
  isStrangerAction,
} from '../../../../redux/actions/FriendAction';

const AddFriend = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { resultSearch, error, userCurrent }: any = useSelector<RootState>(
    (state) => state.user
  );
  const [list, setList] = useState(false);
  const { isFriend, isStranger, isMyRequest, isPeopleRequest, isMe }: any =
    useSelector<RootState>((state) => state.friend);

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');

  const { socket }: any = useSelector<RootState>((state) => state);

  const onSubmit: any = (data: Email) => {
    if (email === '') {
      setList(false);
      return;
    }
    dispatch(searchUserRequest(data));
    setList(true);
  };
  console.log('resultSearch', resultSearch);

  useEffect(() => {
    if (resultSearch) {
      const isFriend = userCurrent.friends.find(
        (x: Friend) => x.idUser === resultSearch._id
      );

      const requested = userCurrent.myRequest.find(
        (x: Friend) => x.idUser === resultSearch._id
      );
      const isPeopleRequest = userCurrent.peopleRequest.find(
        (x: Friend) => x.idUser === resultSearch._id
      );
      const isMe = resultSearch._id === userCurrent._id;

      if (isFriend) {
        console.log(1);
        dispatch(isFriendAction());
      } else if (requested) {
        console.log(2);

        dispatch(isMyRequestAction());
      } else if (isPeopleRequest) {
        console.log(3);

        dispatch(isPeopleRequestAction());
      } else if (isMe) {
        console.log(4);

        dispatch(isMeAction());
      } else {
        console.log(5);

        dispatch(isStrangerAction());
      }
    }
  }, [userCurrent, resultSearch]);

  useEffect(() => {
    socket.on('requestAddFriendToClient', (data: any) => {
      console.log('setStatusResult');
      dispatch(isMyRequestAction());
    });
    return () => socket.off('requestAddFriendToClient');
  }, []);
  useEffect(() => {
    socket.on('deniedAddFriendToClient', () => {
      dispatch(isStrangerAction());
    });
    return () => socket.off('deniedAddFriendToClient');
  }, []);
  useEffect(() => {
    socket.on('acceptAddFriendToClient', () => {
      dispatch(isFriendAction());
    });
    return () => socket.off('acceptAddFriendToClient');
  }, []);

  useEffect(() => {
    socket.on('cancelRequestAddFriendToClient', () => {
      dispatch(isStrangerAction());
    });
    return () => socket.off('cancelRequestAddFriendToClient');
  }, []);

  const handleAddFriend = () => {
    const data = { userFrom: userCurrent._id, userTo: resultSearch._id };
    socket.emit('requestAddFriend', data);
  };

  const handleDeleteRequestFriend = () => {
    const data = { userFrom: userCurrent._id, userTo: resultSearch._id };
    socket.emit('cancelRequestAddFriend', data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
          <div className="title">
            <span>Thêm bạn</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>
          <div>
            <input
              placeholder="Nhập email bạn muốn tìm kiếm"
              {...register('email')}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="results">
            {list && resultSearch ? (
              <>
                <div className="lastresults">Kết quả tìm kiếm</div>
                <div className="item">
                  {
                    <div className="avatar-add-friend">
                      <img src={resultSearch.avatar} alt="" />
                    </div>
                  }
                  <div className="info">
                    <div className="name"> {resultSearch.name}</div>
                  </div>

                  {/* cần phải check resultSearch._id có tồn tại trong request hay không */}
                  <div className="addfriend">
                    {isFriend ? (
                      <span>Bạn bè</span>
                    ) : isStranger ? (
                      <span onClick={() => handleAddFriend()}>Kết bạn</span>
                    ) : isMyRequest ? (
                      <span onClick={() => handleDeleteRequestFriend()}>
                        Hủy lời mời kết bạn
                      </span>
                    ) : isPeopleRequest ? (
                      <>
                        <span>Từ chối</span> <span>Chấp nhận</span>
                      </>
                    ) : isMe ? (
                      ''
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>

          <div className="btn">
            <button className="btn search">Tìm Kiếm</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriend;
