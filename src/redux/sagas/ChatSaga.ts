import { call, put, takeLatest } from '@redux-saga/core/effects';

import { ChatTypes, Conversation, IMessage } from '../types/ChatTypes';

import { Actions } from '../types/CommonTypes';
import {
  addMemberToGroupFailure,
  addMemberToGroupSuccess,
  changeAvatarGroupFailure,
  changeAvatarGroupSuccess,
  changeLeaderFailure,
  changeLeaderSuccess,
  changeNameGroupFailure,
  changeNameGroupSuccess,
  createGroupFailure,
  createGroupSuccess,
  deleteGroupFailure,
  deleteGroupSuccess,
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
  sendMessagesFailure,
  sendMessagesSuccess,
} from '../actions/ChatAction';
import {
  deleteAllMe,
  deleteOnlyMe,
  getAllConversationByUser,
  getAllMessageByConversation,
  sendFile,
  sendImage,
  sendMessage,
} from '../api/ChatApi';
import { getConversationById } from '../api/UserApi';
import { UserTypes } from '../types/UserTypes';
import {
  postAddMemberToGroup,
  postChangeAvatar,
  postChangeLeader,
  postChangeName,
  postCreateGroup,
  postDeleteGroup,
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

function* sendFileSaga(action: Actions) {
  try {
    const data: IMessage = yield call(sendFile, action.payload);
    yield put(sendFileSuccess(data));
  } catch (error) {
    yield put(sendFileFailure(error as Error));
  }
}

function* sendMessageSaga(action: Actions) {
  try {
    const data: IMessage = yield call(sendMessage, action.payload);
    yield put(sendMessagesSuccess(data));
  } catch (error) {
    yield put(sendMessagesFailure(error as Error));
  }
}

function* DeleteMessageOnlyMeSaga(action: Actions) {
  try {
    const data: IMessage = yield call(deleteOnlyMe, action.payload);
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

function* CreateGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postCreateGroup,
      action.payload
    );
    yield put(createGroupSuccess(conversation));
  } catch (error) {
    yield put(createGroupFailure(error as Error));
  }
}

function* DeleteGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postDeleteGroup,
      action.payload
    );
    yield put(deleteGroupSuccess(conversation));
  } catch (error) {
    yield put(deleteGroupFailure(error as Error));
  }
}

function* ChangeNameGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postChangeName,
      action.payload
    );
    yield put(changeNameGroupSuccess(conversation));
  } catch (error) {
    yield put(changeNameGroupFailure(error as Error));
  }
}

function* ChangeAvatarGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postChangeAvatar,
      action.payload
    );
    yield put(changeAvatarGroupSuccess(conversation));
  } catch (error) {
    yield put(changeAvatarGroupFailure(error as Error));
  }
}

function* ChangeLeaderGroupSaga(action: Actions) {
  try {
    const conversation: Conversation = yield call(
      postChangeLeader,
      action.payload
    );
    yield put(changeLeaderSuccess(conversation));
  } catch (error) {
    yield put(changeLeaderFailure(error as Error));
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
  // yield takeLatest(ChatTypes.SEND_VIDEO_REQUEST, sendVideoSaga);
  yield takeLatest(ChatTypes.SEND_FILE_REQUEST, sendFileSaga);
  yield takeLatest(ChatTypes.SEND_MESSAGES_REQUEST, sendMessageSaga);
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
  yield takeLatest(ChatTypes.CREATE_GROUP_REQUEST, CreateGroupSaga);
  yield takeLatest(
    ChatTypes.CHANGE_LEADER_GROUP_REQUEST,
    ChangeLeaderGroupSaga
  );
  yield takeLatest(
    ChatTypes.CHANGE_AVATAR_GROUP_REQUEST,
    ChangeAvatarGroupSaga
  );
  yield takeLatest(ChatTypes.CHANGE_NAME_GROUP_REQUEST, ChangeNameGroupSaga);
  yield takeLatest(ChatTypes.DELETE_GROUP_REQUEST, DeleteGroupSaga);

  yield takeLatest(ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST, AddMemberToGroupSaga);
  yield takeLatest(
    ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST,
    KickMemberOutGroupSaga
  );
}

export default ChatSaga;
