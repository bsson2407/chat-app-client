import { useState, FormEvent } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock } from "@fortawesome/free-solid-svg-icons";
import './new-password.styles.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updatePasswordRequest } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
// import {useNavi}

interface Password {
  password: string;
}

const NewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<Password>();

  const [pass, setPass] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const email: any = localStorage.getItem('emailUserResetPass');
  const onSubmit = (data: Password) => {
    if (pass === repeatPass) {
      if (pass.length < 8) {
        setErrorMessage('Mật khẩu phải tối thiểu 8 kí tự');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
        return;
      } else {
        const newData = {
          email: JSON.parse(email).email,
          newPassword: data.password,
        };
        dispatch(
          updatePasswordRequest(newData, () => {
            navigate('/login');
          })
        );
      }
    } else {
      setErrorMessage('Mật khẩu không khớp');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div className="container-new-pass">
      <div className="title">Khôi phục mật khẩu HiChat</div>

      <form className="pass" onSubmit={handleSubmit(onSubmit)}>
        <div className="pass_input">
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            {...register('password')}
            required
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setPass(e.currentTarget.value)
            }
          ></input>
          <span>{/* <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> */}</span>
        </div>

        <div className="pass_input">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            required
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setRepeatPass(e.currentTarget.value)
            }
          ></input>
          <span>{/* <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> */}</span>
          {errorMessage.length > 0 ? (
            <div className="error">{errorMessage}</div>
          ) : (
            ''
          )}
        </div>

        <div className="btn">
          <button>Xác nhận</button>
        </div>
      </form>
    </div>
  );
};
export default NewPassword;
