import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import './avatar.styles.scss';

const Avatar = () => {
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  return (
    <div className="avatar-container">
      <div className="avatar-img">
        <img src={userCurrent.avatar} alt="avatar" />
        <div className="avatar-img_dot"></div>
      </div>
    </div>
  );
};

export default Avatar;
