import { useState } from 'react';
import './navbar-bottom.styles.scss';
import Profile from './profile/profile.component';
import UpdatePassword from './update-password/update-password.component';
import { useNavigate } from 'react-router-dom';
const NavbarBottom = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openPass, setOpenPass] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleClickOpenPass = (): void => {
    setOpenPass(true);
  };

  const handleClosePass = (): void => {
    setOpenPass(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refeshToken');

    window.location.reload();
    // navigate('/login');
  };
  return (
    <div className="navbar-bottom-container">
      <ul>
        <li
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <i className="fal fa-cog"></i>
          {showMenu ? (
            <div className="menu-bottom">
              <div className="menu-bottom-top" onClick={handleClickOpen}>
                <span>
                  <i className="fal fa-user"></i>
                </span>
                <span>Tài khoản</span>
              </div>
              <div className="menu-bottom-top" onClick={handleClickOpenPass}>
                <span>
                  <i className="fal fa-lock"></i>
                </span>
                <span>Đổi mật khẩu</span>
              </div>
              <div className="menu-bottom-bot" onClick={handleLogout}>
                Đăng xuất
              </div>
            </div>
          ) : (
            ''
          )}
        </li>
      </ul>
      {open === true ? (
        <Profile open={open} handleClose={handleClose}></Profile>
      ) : (
        ''
      )}
      {openPass === true ? (
        <UpdatePassword
          open={openPass}
          handleClose={handleClosePass}
        ></UpdatePassword>
      ) : (
        ''
      )}
    </div>
  );
};

export default NavbarBottom;
