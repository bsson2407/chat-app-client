import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailRequest } from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';

const CountDown = ({ time }: { time: number }) => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(time);
  const { emailUserResetPass } = useSelector((state: RootState) => state.user);
  const handleSendAgainOtp = () => {
    dispatch(getEmailRequest(emailUserResetPass));
    setTimeLeft(60);
  };

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  return (
    <div>
      {timeLeft === 0 ? (
        <div className="send-otp-again" onClick={() => handleSendAgainOtp()}>
          Gửi lại mã?
        </div>
      ) : (
        <div className="countdown-otp">Gửi lại mã sau: {timeLeft}s</div>
      )}
    </div>
  );
};

export default CountDown;
