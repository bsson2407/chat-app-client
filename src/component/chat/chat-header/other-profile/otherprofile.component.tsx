import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux/reducers';
import './otherprofile.styles.scss';
import {
  faCaretDown,
  faCaretRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { IMessage } from '../../../../redux/types/ChatTypes';
import { dateUtils } from '../../../../utils/dateUtils';
import {
  deleteMessageAllMeRequest,
  getAllMessageByConversationRequest,
} from '../../../../redux/actions/ChatAction';
import { unFriendRequest } from '../../../../redux/actions/UserAction';
import { offShow } from '../../../../redux/actions/OptionLayoutAction';
const OtherProfile = () => {
  const dispatch = useDispatch();
  const { friendProfile, userCurrent }: any = useSelector<RootState>(
    (state) => state.user
  );
  const dateOfBirth = new Date(friendProfile.dateOfBirth);
  const { chatWith, listMessage }: any = useSelector<RootState>(
    (state) => state.chat
  );
  const { socket }: any = useSelector<RootState>((state) => state);

  const [showListImage, setShowListImage] = useState(false);
  const [showListFile, setShowListFile] = useState(false);

  const handleShowListImage = () => {
    setShowListImage(!showListImage);
  };

  const handleShowListFile = () => {
    setShowListFile(!showListFile);
  };

  const handleDeleteAll = () => {
    const data: any = {
      idConversation: chatWith.idConversation,
      userId: userCurrent._id,
    };
    dispatch(deleteMessageAllMeRequest(data));
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  };

  const handleUnFriend = () => {
    const data = {
      idUser: userCurrent._id,
      idFriend: friendProfile._id,
      idConversation: chatWith.idConversation,
    };
    if (window.confirm(`Bạn chắc chắn muốn xóa bạn?`)) {
      dispatch(offShow());
      dispatch(unFriendRequest(data));
    }
  };

  const renderListImage = (message: IMessage) => {
    const flag = message.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    return message.type === 'IMAGE' && flag === -1 ? (
      // <img className="item-image" src={message.url} alt="avatar" />
      <></>
    ) : (
      ''
    );
  };

  const renderListFile = (item: IMessage) => {
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    return item.type === 'FILE' && flag === -1 ? (
      <div>
        <a href={item.urlLink}>{item.message}</a>
      </div>
    ) : (
      ''
    );
  };

  return (
    <div className="other_profile_container">
      <div className="OPH--heading">
        <span className="OPH--title">Thông tin cá nhân</span>
      </div>
      <div className="__scroll">
        <div className="OP--imageContainer">
          <div className="OP-img_container">
            <img src={friendProfile.avatar} alt="avatar"></img>
          </div>
          <div className="OPIC--txtContainer">
            <span className="OPIC--title">{friendProfile.name}</span>
          </div>
          <div className="OP-info">
            <div className="item">
              <label>Email:</label>
              <span>{friendProfile.email}</span>
            </div>
            <div className="item">
              <label>Ngày sinh:</label>
              <span>
                {dateUtils.transferDateString(
                  dateOfBirth.getDate(),
                  dateOfBirth.getMonth() + 1,
                  dateOfBirth.getFullYear()
                )}
              </span>
            </div>
            <div className="item">
              <label>Giới tính:</label>
              <span>{friendProfile.gender ? 'Nữ' : 'Nam'}</span>
            </div>
          </div>
        </div>

        <div className="list-image">
          <div className="header">
            <span className="header-title">Ảnh</span>
            <div onClick={handleShowListImage}>
              {showListImage ? (
                <FontAwesomeIcon className="icon" icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCaretRight} />
              )}
            </div>
          </div>
          {showListImage && (
            <div className="body">
              {/* render image (map) after */}
              <div className="body-list-image">
                {listMessage.map((message: IMessage) => {
                  return (
                    <div key={message._id}>{renderListImage(message)}</div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="list-image">
          <div className="header">
            <span className="header-title">File</span>
            <div onClick={handleShowListFile}>
              {showListFile ? (
                <FontAwesomeIcon className="icon" icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon className="icon" icon={faCaretRight} />
              )}
            </div>
          </div>
          {showListFile && (
            <div className="body">
              {/* render image (map) after */}
              <div className="body-list-file">
                {listMessage.map((item: IMessage) => {
                  return <div key={item._id}>{renderListFile(item)}</div>;
                })}
              </div>
            </div>
          )}
        </div>
        <div className="actu-item" onClick={() => handleDeleteAll()}>
          <i className="fal fa-trash"></i>
          <span>Xóa cuộc trò chuyện</span>
        </div>
        <div className="actu-item" onClick={() => handleUnFriend()}>
          <i className="fal fa-trash-can"></i>
          <FontAwesomeIcon className="icon" icon={faTrashAlt} />

          <span>Xóa bạn bè</span>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
