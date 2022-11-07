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

type statusResult = {
  isFriend: boolean;
  isStranger: boolean;
  requested: boolean;
  isPeopleRequest: boolean;
  isMe: boolean;
};

const AddFriend = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [statusResult, setStatusResult] = useState<statusResult>({
    isFriend: false,
    isStranger: false,
    requested: false,
    isPeopleRequest: false,
    isMe: false,
  });

  const { resultSearch, error, userCurrent }: any = useSelector<RootState>(
    (state) => state.user
  );
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');

  const { socket }: any = useSelector<RootState>((state) => state);

  const onSubmit: any = (data: Email) => {
    if (email === '') {
      setErrors('Chưa nhập email');
      return;
    }
    dispatch(searchUserRequest(data));
  };

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
        setStatusResult({
          isStranger: false,
          requested: false,
          isPeopleRequest: false,
          isMe: false,
          isFriend: true,
        });
      } else if (requested) {
        setStatusResult({
          isStranger: false,
          isPeopleRequest: false,
          isMe: false,
          requested: true,
          isFriend: false,
        });
      } else if (isPeopleRequest) {
        setStatusResult({
          isFriend: false,
          isStranger: false,
          requested: false,
          isMe: false,
          isPeopleRequest: true,
        });
      } else if (isMe) {
        setStatusResult({
          isFriend: false,
          isStranger: false,
          requested: false,
          isPeopleRequest: false,
          isMe: true,
        });
      } else {
        setStatusResult({
          isFriend: false,
          requested: false,
          isPeopleRequest: false,
          isMe: false,
          isStranger: true,
        });
      }
    }
  }, [userCurrent, resultSearch]);

  useEffect(() => {
    socket.on('requestAddFriendSuccess', () => {
      console.log('add_friend_success');
      setStatusResult({
        isFriend: false,
        isStranger: false,
        isPeopleRequest: false,
        isMe: false,
        requested: true,
      });
    });

    socket.on('deniedAddFriendSuccess', () => {
      setStatusResult({
        isFriend: false,
        requested: false,
        isPeopleRequest: false,
        isMe: false,
        isStranger: true,
      });
    });

    socket.on('acceptAddFriendSuccess', () => {
      setStatusResult({
        isStranger: false,
        requested: false,
        isPeopleRequest: false,
        isMe: false,
        isFriend: true,
      });
    });

    socket.on('cancelRequestAddFriendSuccessForSender', () => {
      // console.log('cancelRequestAddFriendSuccess');

      setStatusResult({
        isFriend: false,
        requested: false,
        isPeopleRequest: false,
        isMe: false,
        isStranger: true,
      });
    });
  }, [statusResult]);

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
            {resultSearch ? (
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
                    {statusResult.isFriend ? (
                      <span>Bạn bè</span>
                    ) : statusResult.isStranger ? (
                      <span onClick={() => handleAddFriend()}>Kết bạn</span>
                    ) : statusResult.requested ? (
                      <span onClick={() => handleDeleteRequestFriend()}>
                        Hủy lời mời kết bạn
                      </span>
                    ) : statusResult.isPeopleRequest ? (
                      <>
                        <span>Từ chối</span> <span>Chấp nhận</span>
                      </>
                    ) : statusResult.isMe ? (
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
            {errors ? (
              <>
                <div>
                  <span className="error">{errors}</span>
                </div>
              </>
            ) : (
              ''
            )}
            {error ? (
              <>
                <div>
                  <span className="error">{error}</span>
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
