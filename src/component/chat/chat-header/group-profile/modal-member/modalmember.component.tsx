/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import './modalmember.styles.scss';
import { useForm } from 'react-hook-form';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import { listFriend } from '../../../../../redux/types/UserTypes';
import { kickMemberOutGroupRequest } from '../../../../../redux/actions/ChatAction';

const ModalMember = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [error, setError] = useState<string>('');

  // const [initalFriend, setInitalFriend] = useState<any>([]);
  const initalFriend: any = [];
  const { handleSubmit } = useForm();

  const { socket }: any = useSelector<RootState>((state) => state);
  const { listFriend }: any = useSelector<RootState>((state) => state.user);

  const handleDeleteMemberOutGroup = (e: any) => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
      deleteUserId: e,
    };
    dispatch(kickMemberOutGroupRequest(data));
    socket.emit('kickMemberOutGroup', data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form className="dialog-view-member">
          <div className="title">
            <span>Thành viên nhóm</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>

          <div className="main">
            <div className="friends">
              <div className="item">
                <div className="item_title">
                  Danh sách thành viên ({chatWith.members.length})
                  {chatWith.members.map((friend: listFriend) => {
                    // friend.
                    return (
                      <div className="list" key={friend._id}>
                        <div className="list_item">
                          <div className="avatar">
                            <img src={friend.idUser.avatar} alt=""></img>
                          </div>
                          <div className="name">{friend.idUser.name}</div>

                          <div className="option">
                            {chatWith.leaderId === friend.idUser._id
                              ? 'Trưởng nhóm'
                              : chatWith.leaderId === userCurrent._id && (
                                  <span
                                    onClick={() =>
                                      handleDeleteMemberOutGroup(
                                        friend.idUser._id
                                      )
                                    }
                                  >
                                    <i className="fal fa-times"></i>
                                  </span>
                                )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="btn">
            <div className="error">{error ? error : ''}</div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMember;
