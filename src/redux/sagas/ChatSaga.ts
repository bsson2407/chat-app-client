import { call, put, takeLatest } from '@redux-saga/core/effects';

import { ChatTypes, Conversation, IMessage } from '../types/ChatTypes';

import { Actions } from '../types/CommonTypes';
import {
  addMemberToGroupFailure,
  addMemberToGroupSuccess,
  deleteMessageAllMeSuccess,
  deleteMessageOnlyMeFailure,
  deleteMessageOnlyMeSuccess,
  getAllConversationByUserFailure,
  getAllConversationByUserSuccess,
  getAllMessageByConversationFailure,
  getAllMessageByConversationSuccess,
  getConversationByIdFailure,
  getConversationByIdSuccess,
  kickMemberOutGroupFailure,
  kickMemberOutGroupSuccess,
  leaveGroupFailure,
  leaveGroupSuccess,
  sendFileFailure,
  sendFileSuccess,
  sendImagesFailure,
  sendImagesSuccess,
  sendVideoFailure,
  sendVideoSuccess,
} from '../actions/ChatAction';
import {
  deleteAllMe,
  deleteOnlyMe,
  getAllConversationByUser,
  getAllMessageByConversation,
  sendFile,
  sendImage,
  sendVideo,
} from '../api/ChatApi';
import { getConversationById } from '../api/UserApi';
import { UserTypes } from '../types/UserTypes';
import {
  postAddMemberToGroup,
  postKickMemberOutGroup,
  postLeaveGroup,
} from '../api/GroupApi';

function* getAllMessageByConversationSaga(action: Actions) {
  try {
    const data: IMessage[] = yield call(
      getAllMessageByConversation,
      action.payload
    );
    yield put(getAllMessageByConversationSuccess(data));
  } catch (error) {
    yield put(getAllMessageByConversationFailure(error as Error));
  }
}

function* getAllConversationByUserSaga(action: Actions) {
  try {
    const data: Conversation[] = yield call(
      getAllConversationByUser,
      action.payload
    );
    yield put(getAllConversationByUserSuccess(data));
  } catch (error) {
    yield put(getAllConversationByUserFailure(error as Error));
  }
}

function* sendImagesSaga(action: Actions) {
  try {
    const data: IMessage = yield call(sendImage, action.payload);
    yield put(sendImagesSuccess(data));
  } catch (error) {
    yield put(sendImagesFailure(error as Error));
  }
}

function* sendVideoSaga(action: Actions) {
  try {
    const data: IMessage = yield call(sendVideo, action.payload);
    yield put(sendVideoSuccess(data));
  } catch (error) {
    yield put(sendVideoFailure(error as Error));
  }
}

function* sendFileSaga(action: Actions) {
  try {
    const data: IMessage = yield call(sendFile, action.payload);
    yield put(sendFileSuccess(data));
  } catch (error) {
    yield put(sendFileFailure(error as Error));
  }
}

function* DeleteMessageOnlyMeSaga(action: Actions) {
  try {
    const data: IMessage = yield call(deleteOnlyMe, action.payload);
    console.log(data);
    yield put(deleteMessageOnlyMeSuccess(data));
  } catch (error) {
    yield put(deleteMessageOnlyMeFailure(error as Error));
  }
}

function* DeleteMessageAllMeSaga(action: Actions) {
  try {
    const data: IMessage[] = yield call(deleteAllMe, action.payload);
    yield put(deleteMessageAllMeSuccess(data));
  } catch (error) {
    yield put(deleteMessageOnlyMeFailure(error as Error));
  }
}

function* GetConversationByIdSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      getConversationById,
      action.payload
    );
    yield put(getConversationByIdSuccess(conversation));
  } catch (error) {
    yield put(getConversationByIdFailure(error as Error));
  }
}

function* AddMemberToGroupSaga(action: Actions) {
  console.log(action);
  try {
    const conversation: Conversation = yield call(
      postAddMemberToGroup,
      action.payload
    );
    yield put(addMemberToGroupSuccess(conversation));
  } catch (error) {
    yield put(addMemberToGroupFailure(error as Error));
  }
}

function* KickMemberOutGroupSaga(action: Actions) {
  console.log(action);
  try {
    const conversation: Conversation = yield call(
      postKickMemberOutGroup,
      action.payload
    );
    yield put(kickMemberOutGroupSuccess(conversation));
  } catch (error) {
    yield put(kickMemberOutGroupFailure(error as Error));
  }
}

function* LeaveGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postLeaveGroup,
      action.payload
    );
    yield put(leaveGroupSuccess(conversation));
  } catch (error) {
    yield put(leaveGroupFailure(error as Error));
  }
}

function* ChatSaga() {
  yield takeLatest(
    ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST,
    getAllMessageByConversationSaga
  );
  yield takeLatest(
    ChatTypes.GET_ALL_CONVERSATION_BY_USER_REQUEST,
    getAllConversationByUserSaga
  );
  yield takeLatest(ChatTypes.SEND_IMAGES_REQUEST, sendImagesSaga);
  yield takeLatest(ChatTypes.SEND_VIDEO_REQUEST, sendVideoSaga);
  yield takeLatest(ChatTypes.SEND_FILE_REQUEST, sendFileSaga);
  yield takeLatest(
    ChatTypes.DELETE_MESSAGE_ONLY_ME_REQUEST,
    DeleteMessageOnlyMeSaga
  );
  yield takeLatest(
    ChatTypes.DELETE_MESSAGE_ALL_ME_REQUEST,
    DeleteMessageAllMeSaga
  );

  yield takeLatest(
    UserTypes.GET_CONVERSATION_BY_ID_REQUEST,
    GetConversationByIdSaga
  );
  yield takeLatest(ChatTypes.LEAVE_GROUP_REQUEST, LeaveGroupSaga);

  yield takeLatest(ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST, AddMemberToGroupSaga);
  yield takeLatest(
    ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST,
    KickMemberOutGroupSaga
  );
}

export default ChatSaga;
