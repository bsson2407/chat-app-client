import { useState } from 'react';

import './forgotpass.styles.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUserState,
  getEmailRequest,
  saveEmailUser,
} from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Email, UserState } from '../../redux/types/UserTypes';
import OTP from '../otp/otp.component';
// import OTP from './OTP';

const ForgotPass = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ')
      .required(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countDown, setCountDown] = useState<Boolean>(false);
  const onSubmit = async (data: Email) => {
    await dispatch(clearUserState());
    await dispatch(getEmailRequest(data));
    dispatch(saveEmailUser(data));
    setCountDown(true);
    reset();
  };

  const user: UserState = useSelector((state: RootState) => state.user);
  const { errorResetPass } = user;

  return (
    <div className="container">
      <div className="login">
        {countDown ? (
          <OTP></OTP>
        ) : (
          <>
            <div className="login_title">Khôi phục mật khẩu HiChat</div>
            <div className="login_main">
              <div className="login_main_content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <img
                    style={{ height: '150px', width: '150px' }}
                    src="images/logo.png"
                    alt=""
                  />
                  <li>Nhập email để nhận mã xác thực</li>
                  <div className="login_form_input">
                    <input
                      type="text"
                      placeholder="Email"
                      {...register('email')}
                    ></input>
                    {/* <span>
                      <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    </span> */}
                    {/* {errors.email ? (
                      <div className="error">
                        {errors.email?.message}
                      </div>
                    ) : (
                      ''
                    )} */}
                    {/* {errorResetPass ? (
                      <div className="error">{errorResetPass}</div>
                    ) : (
                      ''
                    )} */}
                  </div>
                  <button
                    type="submit"
                    className={'btn_login'}
                    //   onClick={() => handleClearUserState()}
                  >
                    Tiếp tục
                  </button>
                </form>

                <Link to="/login" className="back">
                  Quay lại
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
