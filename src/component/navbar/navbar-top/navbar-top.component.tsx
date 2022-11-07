import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  showChat,
  showFriends,
} from '../../../redux/actions/OptionLayoutAction';
import { RootState } from '../../../redux/reducers';
import './navbar-top.styles.scss';

const NavbarTop = () => {
  const dispatch = useDispatch();

  const chat: any = useSelector<RootState>(
    (state) => state.optionLayout.showChat
  );
  const friends: any = useSelector<RootState>(
    (state) => state.optionLayout.showFriends
  );

  const handleShowChat = () => {
    dispatch(showChat());
  };

  const handleShowFriends = () => {
    dispatch(showFriends());
  };

  return (
    <div className="navbar-top-container">
      <ul>
        <li
          className={chat ? 'navbar-top-active' : ''}
          onClick={handleShowChat}
        >
          <i className="fas fa-comments-alt"></i>
        </li>
        <li
          className={friends ? 'navbar-top-active' : ''}
          onClick={handleShowFriends}
        >
          <i className="fal fa-address-book"></i>
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default NavbarTop;
