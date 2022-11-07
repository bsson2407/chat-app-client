import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  checkOtpFailure,
  checkOtpSuccess,
  getAllFriendFailure,
  getAllFriendSuccess,
  getAllPeopleRequestFailure,
  getAllPeopleRequestSuccess,
  getEmailFailure,
  getEmailSuccess,
  getFriendByIdFailure,
  getFriendByIdSuccess,
  getNewTokenFailure,
  getNewTokenSuccess,
  getUserByIdFailure,
  getUserByIdSuccess,
  loginUserFailure,
  loginUserSuccess,
  registerUserFailure,
  registerUserSuccess,
  searchUserExistFailure,
  searchUserExistSuccess,
  searchUserFailure,
  searchUserSuccess,
  updateAvatarFailure,
  updateAvatarSuccess,
  updatePasswordFailure,
  updatePasswordSuccess,
  updateProfileFailure,
  updateProfileSuccess,
} from '../actions/UserAction';
import {
  addFriend,
  checkOtp,
  getAllFriend,
  getAllPeopleRequest,
  getEmail,
  getNewToken,
  getUserById,
  login,
  register,
  searchUser,
  searchUserExist,
  updateAvatar,
  updatePassword,
  updateProfile,
} from '../api/UserApi';
import {
  EmailPass,
  listFriend,
  Message,
  SignUpStart,
  Tokens,
  UserData,
  UserTypes,
} from '../types/UserTypes';
import { Actions } from '../types/CommonTypes';
import { AxiosError } from 'axios';

function* RegisterSaga(action: Actions) {
  try {
    const user: UserData = yield call(register, action.payload);
    localStorage.setItem('refeshToken', JSON.stringify(user.refeshToken));
    yield put(registerUserSuccess(user));
    action.callback();
  } catch (error) {
    const err = error as AxiosError;

    // console.log(err.response);
    // const data = err.response?.data;
    const errStr = `${err.response?.data}`;
    // alert(error);
    yield put(registerUserFailure(errStr));
    // yield put(registerUserFailure(error as Error));
  }
}
interface errStr {
  errStr?: string;
  // email: string;
}
function* LoginSaga(action: Actions) {
  try {
    const user: UserData = yield call(login, action.payload);
    console.log(user);
    localStorage.setItem('token', JSON.stringify(user.token));
    localStorage.setItem('refeshToken', JSON.stringify(user.refeshToken));

    yield put(loginUserSuccess(user));
    action.callback();
  } catch (error) {
    const err = error as AxiosError;

    // console.log(err.response);
    // const data = err.response?.data;
    const errStr = `${err.response?.data}`;
    // alert(error);
    yield put(loginUserFailure(errStr));
  }
}

function* SearchUserSaga(action: Actions) {
  try {
    const result: UserData = yield call(searchUser, action.payload);
    yield put(searchUserSuccess(result));
  } catch (error) {
    const err = error as AxiosError;

    // console.log(err.response);
    // const data = err.response?.data;
    const errStr = `${err.response?.data}`;
    // alert(error);
    yield put(searchUserFailure(errStr));
  }
}

function* SearchUserExistSaga(action: Actions) {
  try {
    console.log(action.payload);
    const result: boolean = yield call(searchUserExist, action.payload);
    yield put(searchUserExistSuccess(result));
  } catch (error) {
    yield put(searchUserExistFailure(error as Error));
  }
}

function* GetEmailSaga(action: Actions) {
  try {
    const result: Message = yield call(getEmail, action.payload);
    console.log('m:', result);
    yield put(getEmailSuccess(result));
  } catch (error) {
    console.log(error);
    yield put(getEmailFailure(error as Error));
  }
}

function* AddFriendSaga(action: Actions) {
  console.log(action);
  try {
    const result: Message = yield call(addFriend, action.payload);
    yield put(checkOtpSuccess(result));
    // document.location.href = '/newpass';
    action.callback();
  } catch (error) {
    yield put(checkOtpFailure(error as Error));
  }
}

function* CheckOtpSaga(action: Actions) {
  console.log(action);
  try {
    const result: Message = yield call(checkOtp, action.payload);
    yield put(checkOtpSuccess(result));
    // document.location.href = '/newpass';
    action.callback();
  } catch (error) {
    yield put(checkOtpFailure(error as Error));
  }
}

function* UpdatePasswordSaga(action: Actions) {
  try {
    const result: EmailPass = yield call(updatePassword, action.payload);
    yield put(updatePasswordSuccess(result));
    action.callback();
  } catch (error) {
    yield put(updatePasswordFailure(error as Error));
  }
}

function* UpdateProfileSaga(action: Actions) {
  try {
    const result: UserData = yield call(updateProfile, action.payload);
    yield put(updateProfileSuccess(result));
    action.callback();
  } catch (error) {
    yield put(updateProfileFailure(error as Error));
  }
}

function* GetNewTokenSaga(action: Actions) {
  try {
    const result: Tokens = yield call(getNewToken, action.payload);
    localStorage.setItem('token', JSON.stringify(result.accessToken));
    localStorage.setItem('refeshToken', JSON.stringify(result.refeshToken));
    yield put(getNewTokenSuccess(result));
  } catch (error) {
    yield put(getNewTokenFailure(error as Error));
  }
}

function* GetUserByIdSaga(action: Actions) {
  try {
    const user: UserData = yield call(getUserById, action.payload);
    yield put(getUserByIdSuccess(user));
  } catch (error) {
    yield put(getUserByIdFailure(error as Error));
  }
}

function* GetFriendByIdSaga(action: Actions) {
  try {
    const user: UserData = yield call(getUserById, action.payload);
    yield put(getFriendByIdSuccess(user));
  } catch (error) {
    yield put(getFriendByIdFailure(error as Error));
  }
}

function* UpdateAvatarSaga(action: Actions) {
  try {
    const result: UserData = yield call(updateAvatar, action.payload);
    console.log(action.payload);
    yield put(updateAvatarSuccess(result));
  } catch (error) {
    yield put(updateAvatarFailure(error as Error));
  }
}

function* GetAllFriendSaga(action: Actions) {
  try {
    const result: listFriend[] = yield call(getAllFriend, action.payload);
    yield put(getAllFriendSuccess(result));
  } catch (error) {
    yield put(getAllFriendFailure(error as Error));
  }
}

function* GetAllPeopleRequestSaga(action: Actions) {
  try {
    const result: listFriend = yield call(getAllPeopleRequest, action.payload);
    yield put(getAllPeopleRequestSuccess(result));
  } catch (error) {
    yield put(getAllPeopleRequestFailure(error as Error));
  }
}

function* UserSaga() {
  yield takeEvery(UserTypes.LOGIN_USER_REQUEST, LoginSaga);
  yield takeEvery(UserTypes.REGISTER_USER_REQUEST, RegisterSaga);
  yield takeLatest(UserTypes.SEARCH_USER_REQUEST, SearchUserSaga);

  yield takeLatest(UserTypes.SEARCH_USER_EXIST_REQUEST, SearchUserExistSaga);

  yield takeLatest(UserTypes.GET_USER_BY_ID_REQUEST, GetUserByIdSaga);
  yield takeLatest(UserTypes.GET_FRIEND_BY_ID_REQUEST, GetFriendByIdSaga);

  yield takeLatest(UserTypes.UPDATE_AVATAR_REQUEST, UpdateAvatarSaga);

  yield takeLatest(UserTypes.GET_EMAIL_REQUEST, GetEmailSaga);
  yield takeLatest(UserTypes.CHECK_OTP_REQUEST, CheckOtpSaga);
  yield takeLatest(UserTypes.UPDATE_PASSWORD_REQUEST, UpdatePasswordSaga);
  yield takeLatest(UserTypes.GET_NEW_TOKEN_REQUEST, GetNewTokenSaga);

  yield takeLatest(UserTypes.GET_ALL_FRIEND_REQUEST, GetAllFriendSaga);
  yield takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, UpdateProfileSaga);
  yield takeLatest(
    UserTypes.GET_ALL_PEOPLE_REQUEST_REQUEST,
    GetAllPeopleRequestSaga
  );
}

export default UserSaga;
