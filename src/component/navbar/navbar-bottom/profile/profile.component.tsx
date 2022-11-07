import React, { FormEvent, useState } from 'react';
import './profile.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import UpdateProfile from '../update-profile/update-profile.component';
import { dateUtils } from '../../../../utils/dateUtils';

interface Update {
  open: boolean;
  handleClose: () => void;
}

const Profile = ({ open, handleClose }: Update) => {
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [previewSource, setPreviewSource] = useState<any>('');
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  //   const [showUpdateProfile, setShowUpdateProfile] = useState<boolean>(false);

  //   const onClickShowUpdate = () => {
  //     setShowUpdateProfile(!showUpdateProfile);
  //     handleClose();
  //   };

  const dateOfBirth = new Date(userCurrent.dateOfBirth);

  const handleOpenUpdate = (): void => {
    setOpenUpdate(true);
    console.log(openUpdate);
    if (openUpdate === true) {
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="dialog-profile">
            <div className="title">
              <span>Thông tin cá nhân</span>
              <div className="close" onClick={() => handleClose()}></div>
            </div>
            <div className="img">
              <img src="https://cover.talk.zdn.vn/default" alt=""></img>
            </div>
            <div className="avatar">
              <div className="img">
                {previewSource.length > 0 ? (
                  <img src={previewSource} alt="Red dot" />
                ) : (
                  <div>
                    <img src={userCurrent.avatar} alt="avatar"></img>
                  </div>
                )}
              </div>
              <div className="name">
                <span>{userCurrent.name}</span>
              </div>
            </div>
            <div className="infos">
              <div className="info">
                <label>Email: </label>
                <span>{userCurrent.email}</span>
              </div>
              <div className="info">
                <label>Giới tính: </label>
                <span>{userCurrent.gender ? 'Nữ' : 'Nam'}</span>
              </div>
              <div className="info">
                <label>Ngày sinh: </label>
                <span>
                  {dateUtils.transferDateString(
                    dateOfBirth.getDate(),
                    dateOfBirth.getMonth() + 1,
                    dateOfBirth.getFullYear()
                  )}
                </span>
              </div>
            </div>

            <div className="btn">
              <button
                type="submit"
                className="search"
                onClick={handleOpenUpdate}
              >
                Cập nhật thông tin
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {openUpdate === true ? (
        <UpdateProfile
          open={openUpdate}
          handleClose={handleClose}
        ></UpdateProfile>
      ) : (
        ''
      )}
    </>
  );
};

export default Profile;
