/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import avatar from '../../../asset/images/avatar.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import './chatheader.styles.scss';

import {
  showOptionGroupProfile,
  showOptionOtherProfile,
} from '../../../redux/actions/OptionLayoutAction';
import { ActionTypes } from '../../../redux/types/ActionTypes';
import ModalAddMember from './modal-add-member/modaladdmember.component';

const ChatHeader = (props: any) => {
  // const { isSingle } = props;
  const dispatch = useDispatch();

  const { socket, peer }: any = useSelector<RootState>((state) => state);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const { showOtherProfile, showGroupProfile }: any = useSelector<RootState>(
    (state) => state.optionLayout
  );

  const [showAddMember, setShowAddMember] = useState(false);

  const handelShowAddMember = () => {
    setShowAddMember(true);
  };

  const handelCloseAddMember = () => {
    setShowAddMember(false);
  };
  // Call
  const caller = ({ video }: any) => {
    const msg = {
      sender: chatWith.idUser._id,
      recipient: userCurrent._id,
      username: chatWith.idUser.name,
      video,
    };
    dispatch({ type: ActionTypes.CALL, payload: msg });
  };

  const callUser = ({ video }: any) => {
    const msg = {
      peerId: '',
      sender: userCurrent._id,
      recipient: chatWith.idUser._id,
      username: userCurrent.name,
      video,
    };

    if (peer.open) {
      msg.peerId = peer._id;
    }

    socket.emit('callUser', msg);
  };

  const handlePhoneCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };
  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  const showClickOtherProfile = () => {
    showOtherProfile
      ? dispatch(showOptionOtherProfile(false))
      : dispatch(showOptionOtherProfile(true));
  };

  const showClickGroupProfile = () => {
    showGroupProfile
      ? dispatch(showOptionGroupProfile(false))
      : dispatch(showOptionGroupProfile(true));
  };

  return (
    <div className="header">
      <div className="avatar">
        <div className="img">
          <img
            src={
              chatWith.type === 'single'
                ? chatWith.idUser.avatar
                : chatWith.avatar
            }
            alt=""
          ></img>
        </div>
      </div>
      <div className="main">
        <div className="name">
          <span>
            {chatWith.type === 'single' ? chatWith.idUser.name : chatWith.name}
          </span>
        </div>
        {/* <div className=member}>
                            <span><i className="fal fa-user"></i> 530 thành viên</span>
                        </div> */}
      </div>
      <div className="btn">
        {chatWith.type === 'single' ? (
          <>
            <div className="add" onClick={handlePhoneCall}>
              <span>
                <i className="fal fa-phone"></i>
              </span>
            </div>
            <div className="search" onClick={handleVideoCall}>
              <span>
                <i className="fal fa-video"></i>
              </span>
            </div>
            <div className="show">
              <span onClick={showClickOtherProfile}>
                <i className="fal fa-bars"></i>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="search" onClick={handelShowAddMember}>
              <span>
                <i className="fal fa-users-medical"></i>
              </span>
              {showAddMember && (
                <ModalAddMember
                  open={showAddMember}
                  handleClose={handelCloseAddMember}
                />
              )}
            </div>
            <div className="show">
              <span onClick={showClickGroupProfile}>
                <i className="fal fa-bars"></i>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
