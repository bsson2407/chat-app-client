import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkOtpRequest } from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';
import { Email, UserState } from '../../redux/types/UserTypes';
import CountDown from './countDown.component';
import './otp.styles.scss';

const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [time, setTime] = useState(60);
  const [otp, setOtp] = useState('');
  const { emailUserResetPass }: { emailUserResetPass: Email } = useSelector(
    (state: RootState) => state.user
  );

  const user: UserState = useSelector((state: RootState) => state.user);
  const { error } = user;

  const handleChange = (otp: string) => setOtp(otp);

  const getOtpValue = async () => {
    const data = {
      email: emailUserResetPass.email,
      otp,
    };
    await dispatch(
      checkOtpRequest(data, () => {
        navigate('/newpass');
      })
    );
  };

  return (
    <div className="otp-forgot">
      <div className="title">Khôi phục mật khẩu HiChat</div>
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

export default OTP;
