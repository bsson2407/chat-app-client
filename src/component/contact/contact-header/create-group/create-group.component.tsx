/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react';
import './create-group.styles.scss';
import { useForm } from 'react-hook-form';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import { getAllFriendRequest } from '../../../../redux/actions/UserAction';
import { listFriend } from '../../../../redux/types/UserTypes';

const CreateGroup = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [nameGroup, setNameGroup] = useState<string>('');
  const [checkList, setCheckList] = useState([]);
  const [itemSelected, setItemSelected] = useState<any>([]);
  const [error, setError] = useState<string>('');

  // const [initalFriend, setInitalFriend] = useState<any>([]);
  const initalFriend: any = [];
  const { handleSubmit } = useForm();

  const { socket }: any = useSelector<RootState>((state) => state);
  const { listFriend }: any = useSelector<RootState>((state) => state.user);
  useEffect(() => {
    dispatch(getAllFriendRequest(userCurrent._id));
  }, []);

  const onSubmit: any = () => {
    if (nameGroup === '') {
      setError('Chưa nhập tên nhóm');
      return;
    }
    const data = {
      userIdSelf: userCurrent._id,
      nameGroup,
      userIds: checkList,
    };
    socket.emit('createGroup', data);
    handleClose();
    // dispatch(searchUserRequest(data));
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    const index = checkList.findIndex((element) => element === value);
    let checkListTemp: any = [...checkList];
    let itemSelectedTemp = [...itemSelected];
    console.log(value);
    console.log(index);

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
    console.log(checkListTemp);
    console.log(itemSelectedTemp);

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
        <form className="dialog-group" onSubmit={handleSubmit(onSubmit)}>
          <div className="title">
            <span>Tạo nhóm</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>
          <div className="create">
            <div className="camera">
              <span>
                <i className="fal fa-camera"></i>
              </span>
            </div>
            <div className="phone">
              <input
                placeholder="Nhập tên nhóm"
                onChange={(e) => setNameGroup(e.target.value)}
              ></input>
            </div>
          </div>
          {/* <div className="search">
            <span>Thêm bạn vào nhóm</span>
            <form>
              <input placeholder="Số điện thoại hoặc email"></input>
              <span>
                <i className="fal fa-search"></i>
              </span>
            </form> */}
          {/* </div> */}

          <div className="main">
            <div className="friends">
              <div className="item">
                <div className="item_title">Danh sách bạn bè</div>

                {listFriend ? (
                  listFriend.map((friend: listFriend) => {
                    // friend.
                    return (
                      <div className="list" key={friend._id}>
                        <div className="list_item">
                          <div className="checkbox">
                            <Checkbox
                              color="primary"
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                              onChange={handleChange}
                              value={friend.idUser._id}
                            />
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
            {/* <div className="added">
              <div className="count">
                Đã chọn <span>9/100</span>
              </div>
              <div className="added_list">
                <div className="added_list_item">
                  <div className="avatar">
                     <img src={avatar}></img>
                  </div>
                  <div className="name">Cao Kha HieuCao Kha Hieu</div>
                  <div className="close">
                    <span>
                      <i className="fal fa-times-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="btn">
            <div className="error">{error ? error : ''}</div>

            {/* <button className="btn cancel">Hủy</button> */}
            {checkList.length >= 2 ? (
              <button className="btn search">Tạo nhóm</button>
            ) : (
              <div>Chưa đủ thành viên</div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
