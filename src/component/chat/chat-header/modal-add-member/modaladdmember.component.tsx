import React, { useEffect, useState } from 'react';
import './modaladdmember.styles.scss';
import { useForm } from 'react-hook-form';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import { FriendItem, listFriend } from '../../../../redux/types/UserTypes';
import {
  getAllFriendRequest,
  getUserByIdRequest,
} from '../../../../redux/actions/UserAction';
import {
  addMemberToGroupRequest,
  getAllMessageByConversationRequest,
} from '../../../../redux/actions/ChatAction';

const ModalAddMember = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [error, setError] = useState<string>('');

  // const [initalFriend, setInitalFriend] = useState<any>([]);
  const memberInGroup: any = [];
  const initalFriend: any = [];

  const { handleSubmit } = useForm();

  const { socket }: any = useSelector<RootState>((state) => state);
  const { listFriend }: any = useSelector<RootState>((state) => state.user);

  const [checkList, setCheckList] = useState([]);
  const [itemSelected, setItemSelected] = useState<any>([]);
  // useEffect(() => {
  chatWith.members.filter((val: listFriend) => {
    memberInGroup.push(val.idUser._id);
  });
  // }, []);

  useEffect(() => {
    dispatch(getAllFriendRequest(userCurrent._id));
  }, []);
  const onSubmit: any = () => {
    const data = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
      newUserIds: checkList,
    };
    dispatch(addMemberToGroupRequest(data));
    // socket.emit('addMemberToGroup', data);
    // dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // dispatch(getUserByIdRequest(userCurrent._id));

    handleClose();
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    const index = checkList.findIndex((element) => element === value);
    let checkListTemp: any = [...checkList];
    let itemSelectedTemp = [...itemSelected];

    // itemSelectedTemp.push(value);
    // setItemSelected(itemSelectedTemp);

    // nếu như đã có
    if (index !== -1) {
      itemSelectedTemp = itemSelectedTemp.filter(
        (element: any) => element._id !== value
      );

      checkListTemp = checkListTemp.filter((element: any) => element !== value);

      // chưa có
    } else {
      checkListTemp.push(value);
      const index = initalFriend.findIndex(
        (element: any) => element._id === value
      );

      if (index !== -1) {
        itemSelectedTemp.push(initalFriend[index]);
      }
    }
    setCheckList(checkListTemp);
    setItemSelected(itemSelectedTemp);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form className="dialog-add-member" onSubmit={handleSubmit(onSubmit)}>
          <div className="title">
            <span>Thêm thành viên nhóm</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>

          <div className="main">
            <div className="friends">
              <div className="item">
                <div className="item_title">
                  Danh sách thành viên ({chatWith.members.length})
                  {listFriend ? (
                    listFriend.map((friend: listFriend) => {
                      // friend.
                      return (
                        <div className="list" key={friend._id}>
                          <div className="list_item">
                            <div className="checkbox">
                              {memberInGroup.includes(friend.idUser._id) ? (
                                <Checkbox disabled />
                              ) : (
                                <Checkbox
                                  color="primary"
                                  inputProps={{
                                    'aria-label': 'secondary checkbox',
                                  }}
                                  onChange={handleChange}
                                  value={friend.idUser._id}
                                />
                              )}
                            </div>
                            <div className="avatar">
                              <img src={friend.idUser.avatar} alt=""></img>
                            </div>
                            <div className="name">{friend.idUser.name}</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="name">Chưa có bạn bè</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="btn">
            <div className="error">{error ? error : ''}</div>
            {checkList.length >= 1 ? (
              <button className="btn search">Thêm thành viên</button>
            ) : (
              <div>Chưa chọn thành viên</div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddMember;
