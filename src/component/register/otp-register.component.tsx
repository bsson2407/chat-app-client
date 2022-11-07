import { async } from '@firebase/util';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  checkOtpRequest,
  loginUserRequest,
} from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';
import { Email, UserData, UserState } from '../../redux/types/UserTypes';
import CountDown from '../otp/countDown.component';
import './otp-register.styles.scss';

const OTPRegister = ({ password }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [time, setTime] = useState(60);
  const [otp, setOtp] = useState('');
  //   const { emailUserRegister }: { emailUserRegister: Email } = useSelector(
  //     (state: RootState) => state.user
  //   );
  console.log(password);
  const { emailUserResetPass }: { emailUserResetPass: Email } = useSelector(
    (state: RootState) => state.user
  );
  console.log('email', emailUserResetPass);
  const user: UserState = useSelector((state: RootState) => state.user);
  const { error } = user;

  const handleChange = (otp: string) => setOtp(otp);
  const { checkOtp, userCurrent }: any = useSelector<RootState>(
    (state) => state.user
  );
  const getOtpValue = async () => {
    const data = {
      email: emailUserResetPass.email,
      otp,
    };
    const dataLogin = {
      email: emailUserResetPass.email,
      password: password,
    };

    await dispatch(
      checkOtpRequest(data, () => {
        dispatch(
          loginUserRequest(dataLogin, () => {
            navigate('/');
          })
        );
      })
    );
  };

  return (
    <div className="otp-register">
      <div className="title">Xác nhận tài khoản</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <OtpInput
          inputStyle={{
            width: '40px',
            flex: '1',
            minWidth: '25px',
            minHeight: '25px',
            fontSize: '1rem',
            color: 'black',
            margin: '2px',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
          }}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<strong>.</strong>}
        />

        {error ? <div className="error">OTP không đúng</div> : ''}
      </div>
      <div className="btn">
        <button onClick={() => getOtpValue()}>Xác nhận</button>
      </div>

      <CountDown time={time}></CountDown>
    </div>
  );
};

export default OTPRegister;
