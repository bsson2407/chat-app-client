import React, { FormEvent, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './update-password.styles.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import {
  updateAvatarRequest,
  updatePasswordRequest,
  updateProfileRequest,
} from '../../../../redux/actions/UserAction';
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core';
import { dateUtils } from '../../../../utils/dateUtils';
import SelectInput from '@material-ui/core/Select/SelectInput';

interface Update {
  open: boolean;
  handleClose: () => void;
}

interface Password {
  password: string;
}

const UpdatePassword = ({ open, handleClose }: Update) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<Password>();
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const [pass, setPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');

  const [repeatPass, setRepeatPass] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const onSubmit = async (data: Password) => {
    if (pass === userCurrent.password) {
      if (newPass === repeatPass) {
        if (newPass.length < 8) {
          setErrorMessage('Mật khẩu phải tối thiểu 8 kí tự');
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
          return;
        } else {
          const newData = {
            email: userCurrent.email,
            newPassword: data.password,
          };
          dispatch(updatePasswordRequest(newData, () => {}));
          handleClose();
        }
      } else {
        setErrorMessage('Mật khẩu không khớp');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } else {
      setErrorMessage('Sai mật khẩu hiện tại');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form className="dialog-update-pass" onSubmit={handleSubmit(onSubmit)}>
          <div className="title">
            <span>Đổi mật khẩu</span>
            <div className="close" onClick={() => handleClose()}></div>
          </div>

          <div className="pass">
            <div className="pass_input">
              <label>Mật khẩu hiện tại</label>

              <input
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                required
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setPass(e.currentTarget.value)
                }
              ></input>
              <span>
                {/* <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> */}
              </span>
            </div>

            <div className="pass_input">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                {...register('password')}
                required
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setNewPass(e.currentTarget.value)
                }
              ></input>
              <span>
                {/* <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> */}
              </span>
            </div>

            <div className="pass_input">
              <label>Nhập lại mật khẩu mới</label>

              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                required
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setRepeatPass(e.currentTarget.value)
                }
              ></input>
              <span>
                {/* <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> */}
              </span>
              {errorMessage.length > 0 ? (
                <div className="error">{errorMessage}</div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="btn">
            <button className="cancel" onClick={() => handleClose()}>
              Hủy
            </button>
            <button type="submit" className="search">
              Cập nhật
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePassword;
