import { ChangeEvent, useState } from 'react';
import AddFriend from './add-friend/add-friend.component';
import './contact-header.styles.scss';
import CreateGroup from './create-group/create-group.component';
type SearchBoxProps = {
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ContactHeader = ({ onChangeHandler }: SearchBoxProps) => {
  const [openFriend, setOpenFriend] = useState<Boolean>(false);
  const [openGroup, setOpenGroup] = useState<Boolean>(false);

  const handleClickOpenGroup = () => {
    setOpenGroup(true);
  };

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const handleClickOpenFriend = () => {
    setOpenFriend(true);
  };

  const handleCloseFriend = () => {
    setOpenFriend(false);
  };
  return (
    <div className="contact-header-container">
      {openFriend === true ? (
        <AddFriend
          open={openFriend}
          handleClose={handleCloseFriend}
        ></AddFriend>
      ) : (
        ''
      )}
      {openGroup === true ? (
        <CreateGroup
          open={openGroup}
          handleClose={handleCloseGroup}
        ></CreateGroup>
      ) : (
        ''
      )}
      <form>
        <input placeholder="Tìm kiếm" onChange={onChangeHandler}></input>
        <span>
          <i className="fal fa-search" />
        </span>
      </form>
      <div className="add-friend" onClick={handleClickOpenFriend}>
        <i className="fal fa-user-plus"></i>
      </div>
      <div className="create-group" onClick={handleClickOpenGroup}>
        <i className="fal fa-users"></i>
      </div>
    </div>
  );
};

export default ContactHeader;
