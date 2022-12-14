import './login.styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUserState,
  loginUserRequest,
} from '../../redux/actions/UserAction';
import { RootState } from '../../redux/reducers';
import { UserData, UserState } from '../../redux/types/UserTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm<FormData>();
  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không hợp lệ'
      ),
    // password: yup.string().min(8, 'Mật khẩu phải trên 8 kí tự'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user: UserState = useSelector((state: RootState) => state.user);
  const { error } = user;
  const [email, setEmail] = useState('');
  const [seen, setSeen] = useState(false);
  const [password, setPassword] = useState('');
  const handleClearUserState = (): void => {
    dispatch(clearUserState());
  };

  const onSubmit = async (data: UserData) => {
    // dispatch
    dispatch(
      loginUserRequest(data, () => {
        navigate('/');
      })
    );
  };

  return (
    <section className="container">
      <div className="login">
        <div className="login_title">Đăng nhập tài khoản HiChat</div>

        <div className="login_main">
          <div className="login_main_content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <img
                style={{ height: '150px', width: '150px' }}
                src="images/logo.png"
                alt=""
              />
              <div className="login_form_input">
                <label
                  className={`${
                    email.length ? 'shrink' : ''
                  } login_form_input-label`}
                >
                  Email
                </label>
                <input
                  type="text"
                  {...register('email')}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setEmail(e.currentTarget.value)
                  }
                  required
                ></input>
              </div>
              {errors ? (
                <div className="error">
                  {errors.email?.message ? `${errors.email?.message}` : ''}
                </div>
              ) : (
                ''
              )}
              <div className="login_form_input">
                <label
                  className={`${
                    password.length ? 'shrink' : ''
                  } login_form_input-label`}
                >
                  Mật khẩu
                </label>
                <input
                  type={seen ? 'text' : 'password'}
                  {...register('password')}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    setPassword(e.currentTarget.value)
                  }
                  required
                ></input>
                <span className="icon-login" onClick={() => setSeen(!seen)}>
                  {seen ? (
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                  )}
                </span>

                {error ? <div className="error">{error}</div> : ''}
              </div>
              <button className="btn_login">Đăng nhập</button>
              <Link
                to="/forgotpass"
                className="forgot_password"
                onClick={() => {
                  handleClearUserState();
                }}
              >
                Quên mật khẩu?
              </Link>
            </form>
          </div>
        </div>

        <div>
          <p className="action_more">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" onClick={() => handleClearUserState()}>
              Đăng ký ngay!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
