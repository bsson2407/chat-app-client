/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import './modalmember.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import { listFriend } from '../../../../../redux/types/UserTypes';
import {
  changeLeaderRequest,
  kickMemberOutGroupRequest,
} from '../../../../../redux/actions/ChatAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const ModalMember = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showId, setShowId] = useState<string>('');

  // const [initalFriend, setInitalFriend] = useState<any>([]);
  const handleShowMenu = (e: any) => {
    console.log(e);
    setShowMenu((a) => !a);
    setShowId(e);
  };

  const handleDeleteMemberOutGroup = (e: any) => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
      deleteUserId: e._id,
    };

    if (window.confirm(`Bạn chắc chắn muốn xóa ${e.name}  ra khỏi nhóm ?`)) {
      dispatch(kickMemberOutGroupRequest(data));
    }
    // socket.emit(data.deleteUserId);
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));
  };

  const handleChangeLeaderGroup = (e: any) => {
    const data = {
      idConversation: chatWith.idConversation,
      // userId: userCurrent._id,
      idNewLeader: e,
    };
    // socket.emit(data.deleteUserId);
    dispatch(changeLeaderRequest(data));
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));
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
                          <div className="info">
                            <div className="avatar">
                              <img src={friend.idUser.avatar} alt=""></img>
                            </div>
                            <div className="name">{friend.idUser.name}</div>
                          </div>

                          <div className="option">
                            {chatWith.leaderId === friend.idUser._id
                              ? 'Trưởng nhóm'
                              : chatWith.leaderId === userCurrent._id && (
                                  <>
                                    <span
                                      className="icon-leader"
                                      onClick={() =>
                                        handleShowMenu(friend.idUser._id)
                                      }
                                    >
                                      <FontAwesomeIcon
                                        className="icon"
                                        icon={faEllipsisVertical}
                                      />
                                      {showMenu &&
                                      showId === friend.idUser._id ? (
                                        <div className="menu">
                                          <div
                                            className="menu-item"
                                            onClick={() =>
                                              handleChangeLeaderGroup(
                                                friend.idUser._id
                                              )
                                            }
                                          >
                                            <span>Chuyển trưởng nhóm</span>
                                          </div>
                                          <div
                                            className="menu-item"
                                            onClick={() =>
                                              handleDeleteMemberOutGroup(
                                                friend.idUser
                                              )
                                            }
                                          >
                                            <span>Xóa khỏi nhóm</span>
                                          </div>
                                        </div>
                                      ) : (
                                        ''
                                      )}
                                    </span>
                                  </>
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMember;
