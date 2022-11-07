import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import ContactHeader from './contact-header/contact-header.component';
import './contact.styles.scss';
import Conversation from './conversation/conversation.component';
import ListFriend from './list-friend/list-friend.component';
const Contact = () => {
  const { showChat, showFriends }: any = useSelector<RootState>(
    (state) => state.optionLayout
  );
  const [searchField, setSearchField] = useState('');
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value.toLocaleLowerCase());
  };

  return (
    <div className="contact-container">
      <ContactHeader onChangeHandler={onSearchChange}></ContactHeader>
      {showChat ? <Conversation /> : ''}
      {showFriends ? <ListFriend /> : ''}
    </div>
  );
};

export default Contact;
