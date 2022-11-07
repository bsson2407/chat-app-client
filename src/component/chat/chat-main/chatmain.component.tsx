/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import './chatmain.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import {
  deleteMessageOnlyMeRequest,
  getAllMessageByConversationRequest,
  getConversationByIdRequest,
  pushNewMesssgeToListMessage,
  recallAMesssgeToListMessage,
  saveInfoChatWith,
} from '../../../redux/actions/ChatAction';
import { IMessage, User } from '../../../redux/types/ChatTypes';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import Card from './card.component';
import {
  getFriendByIdRequest,
  getUserByIdRequest,
} from '../../../redux/actions/UserAction';
import { getConversationById } from '../../../redux/api/UserApi';
// import moment from 'moment';
const ChatMain = () => {
  const dispatch = useDispatch();
  const { chatWith, listMessage, isLoading }: any = useSelector<RootState>(
    (state) => state.chat
  );

  // console.log(chatWith.idConversation);
  const { socket }: any = useSelector<RootState>((state) => state);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);

  const recallMessage = (e: any) => {
    socket.emit('recall_user', e);
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  };
  const deleteMessageOnlyMe = (e: IMessage) => {
    // socket.emit('recall_user', e);
    const data = {
      _id: e._id,
      userId: userCurrent._id,
    };
    dispatch(deleteMessageOnlyMeRequest(data));
    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
  };
  useEffect(() => {
    // socket.on('seen_message', () => {
    console.log(chatWith.idConversation);

    dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    // });
  }, [chatWith.idConversation]);

  useEffect(() => {
    var element: any = document.querySelector(`.listMessage`);
    element.scrollTop = element.scrollHeight;
    if (chatWith.type === 'single')
      dispatch(getFriendByIdRequest(chatWith.idUser._id));

    socket.on('recall_message', (recallMessage: IMessage) => {
      dispatch(recallAMesssgeToListMessage(recallMessage));
      dispatch(getAllMessageByConversationRequest(chatWith.idConversation));
    });
    socket.on('addMemberToGroupSuccess', (conversationId: string) => {
      console.log(conversationId);
      dispatch(getAllMessageByConversationRequest(conversationId));
      dispatch(getUserByIdRequest(userCurrent._id));
    });
    socket.on('kickMemberOutGroupSuccess', (conversationId: string) => {
      dispatch(getAllMessageByConversationRequest(conversationId));
      dispatch(getUserByIdRequest(userCurrent._id));
    });
  }, []);
  socket.on('leaveGroupToClient', (conversationId: string) => {
    console.log(conversationId);
    console.log('leaveGroupToClient');
    dispatch(getAllMessageByConversationRequest(conversationId));
    dispatch(getUserByIdRequest(userCurrent._id));
  });
  // console.log(chatWith);
  useEffect(() => {
    socket.emit('join_conversation', chatWith.idConversation);
    socket.on('new_message', (newMessage: IMessage) => {
      dispatch(pushNewMesssgeToListMessage(newMessage));
    });
  }, [chatWith]);

  // useEffect(())

  // useEffect(() => {
  //   var element: any = document.querySelector(`.listMessage`);
  //   element.scrollTop = element.scrollHeight;
  // }, []);

  const renderMessageMe = (item: IMessage, index: number, arr: IMessage[]) => {
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    const date = new Date(item.createdAt);

    return (
      <>
        {flag === -1 ? (
          <div className="listMessage_item_me">
            {
              // HIDE AVATAR IF MESSAGE HAVE SENDER === PREVIOUS SENDER
              index > 0 && item.sender === arr[index - 1].sender ? (
                <div className="avatar" style={{ opacity: '0' }}>
                  <img src={'chatWith.idUser.avatar'} alt="avatar"></img>
                </div>
              ) : (
                <div className="avatar">
                  <img src={userCurrent.avatar} alt="avatar"></img>
                </div>
              )
            }
            <TippyHeadless
              placement="left-end"
              interactive
              // placement="bottom-start"
              // offset={[-74, -18]} // 10 4
              delay={[200, 100]}
              appendTo={() => document.body}
              render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                  <Card className="me_menu_list">
                    <div className="tippy-options">
                      {item.type !== 'RECALL' && (
                        <Tippy
                          className="tippy-item"
                          content="Thu hồi"
                          delay={[200, 0]}
                        >
                          <button
                            className="tippy-item-button"
                            onClick={() => recallMessage(item._id)}
                          >
                            <FontAwesomeIcon
                              className="tippy-item-icon"
                              icon={faArrowRotateLeft}
                            />
                          </button>
                        </Tippy>
                      )}

                      <Tippy
                        className="tippy-item"
                        content="Xóa"
                        delay={[200, 0]}
                      >
                        <button onClick={() => deleteMessageOnlyMe(item)}>
                          <FontAwesomeIcon icon={faTrashArrowUp} />
                        </button>
                      </Tippy>
                      {/* Menu children */}
                    </div>
                  </Card>
                </div>
              )}
            >
              {index === listMessage.length - 1 ? (
                <div className="main">
                  {item.type === 'IMAGE' ? (
                    <img className="image" alt="img" src={item.url} />
                  ) : item.type === 'TEXT' ? (
                    <div className="text">{item.message}</div>
                  ) : item.type === 'VIDEO' ? (
                    <video width="500" height="300" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  ) : item.type === 'FILE' ? (
                    <a href={item.url}>{item.message}</a>
                  ) : item.type === 'RECALL' ? (
                    <div className="recall-message">{item.message}</div>
                  ) : (
                    ''
                  )}

                  <div className="more">
                    <span className="time">{`${date.getHours()}:${date.getMinutes()}`}</span>
                    {item.seen ? (
                      <span className="status">Đã xem</span>
                    ) : (
                      <span className="status">Đã nhận</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="main">
                  {item.type === 'IMAGE' ? (
                    <img className="image" alt="img" src={item.url} />
                  ) : item.type === 'TEXT' ? (
                    <div className="text">{item.message}</div>
                  ) : item.type === 'VIDEO' ? (
                    <video width="500" height="300" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  ) : item.type === 'FILE' ? (
                    <div>
                      <a href={item.url}>{item.message}</a>
                    </div>
                  ) : item.type === 'RECALL' ? (
                    <div className="recall-message">{item.message}</div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </TippyHeadless>
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  const renderMessageForGroup = (
    item: IMessage,
    index: number,
    arr: IMessage[]
  ) => {
    const chatGroupUser = chatWith.members.find(
      (itemUser: User) =>
        // itemUser.idUser._id === item.sender;
        item.sender !== itemUser.idUser._id
    );
    return (
      <>
        {/* // HIDE AVATAR IF MESSAGE HAVE SENDER === PREVIOUS SENDER */}
        {index > 0 && item.sender === arr[index - 1].sender ? (
          <div className="avatar" style={{ opacity: '0' }}>
            <img src={chatGroupUser.idUser.avatar} alt="avatar"></img>
          </div>
        ) : (
          <div className="avatar">
            <img src={chatGroupUser.idUser.avatar} alt="avatar"></img>
          </div>
        )}
        {index === listMessage.length - 1 ? (
          <div className="main">
            {item.type === 'IMAGE' ? (
              <img className="image" alt="img" src={item.url} />
            ) : item.type === 'TEXT' ? (
              <div className="text">{item.message}</div>
            ) : item.type === 'VIDEO' ? (
              <video width="500" height="300" controls>
                <source src={item.url} type="video/mp4" />
              </video>
            ) : item.type === 'FILE' ? (
              <a href={item.url}>{item.message}</a>
            ) : item.type === 'RECALL' ? (
              <div className="recall-message">{item.message}</div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="main">
            {item.type === 'IMAGE' ? (
              <img className="image" alt="img" src={item.url} />
            ) : item.type === 'TEXT' ? (
              <div className="text">{item.message}</div>
            ) : item.type === 'VIDEO' ? (
              <video width="500" height="300" controls>
                <source src={item.url} type="video/mp4" />
              </video>
            ) : item.type === 'FILE' ? (
              <a href={item.url}>{item.message}</a>
            ) : item.type === 'RECALL' ? (
              <div className="recall-message">{item.message}</div>
            ) : (
              ''
            )}
          </div>
        )}
      </>
    );
  };

  const renderMessageForSingle = (
    item: IMessage,
    index: number,
    arr: IMessage[]
  ) => {
    const flag = item.deleteBy?.findIndex(
      (userIdele) => userIdele == userCurrent._id
    );
    return (
      <>
        {flag === -1 ? (
          <>
            {
              // HIDE AVATAR IF MESSAGE HAVE SENDER === PREVIOUS SENDER
              index > 0 && item.sender === arr[index - 1].sender ? (
                <div className="avatar" style={{ opacity: '0' }}>
                  <img src={chatWith.idUser.avatar} alt="avatar"></img>
                </div>
              ) : (
                <div className="avatar">
                  <img src={chatWith.idUser.avatar} alt="avatar"></img>
                </div>
              )
            }
            <TippyHeadless
              placement="right-end"
              interactive
              // placement="bottom-start"
              // offset={[-74, -18]} // 10 4
              delay={[200, 100]}
              appendTo={() => document.body}
              render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                  <Card className="me_menu_list">
                    <div className="tippy-options">
                      <Tippy
                        className="tippy-item"
                        content="Xóa"
                        delay={[200, 0]}
                      >
                        <button onClick={() => deleteMessageOnlyMe(item)}>
                          <FontAwesomeIcon icon={faTrashArrowUp} />
                        </button>
                      </Tippy>
                      {/* Menu children */}
                    </div>
                  </Card>
                </div>
              )}
            >
              {index === listMessage.length - 1 ? (
                <div className="main">
                  {item.type === 'IMAGE' ? (
                    <img className="image" alt="img" src={item.url} />
                  ) : item.type === 'TEXT' ? (
                    <div className="text">{item.message}</div>
                  ) : item.type === 'VIDEO' ? (
                    <video width="500" height="300" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  ) : item.type === 'FILE' ? (
                    <a href={item.url}>{item.message}</a>
                  ) : item.type === 'RECALL' ? (
                    <div className="recall-message">{item.message}</div>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <div className="main">
                  {item.type === 'IMAGE' ? (
                    <img className="image" alt="img" src={item.url} />
                  ) : item.type === 'TEXT' ? (
                    <div className="text">{item.message}</div>
                  ) : item.type === 'VIDEO' ? (
                    <video width="500" height="300" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  ) : item.type === 'FILE' ? (
                    <a href={item.url}>{item.message}</a>
                  ) : item.type === 'RECALL' ? (
                    <div className="recall-message">{item.message}</div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </TippyHeadless>
          </>
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <div className="chat">
      <div className="listMessage">
        {listMessage.map((item: IMessage, index: number, arr: IMessage[]) => (
          // CHECK SENDER IS CURRENT_USER OR SOMEONE
          <div key={item._id}>
            {item.type === 'NOTIFY' ? (
              <div className="message-notify">
                <span>{item.message}</span>
              </div>
            ) : item.sender === userCurrent._id ? (
              renderMessageMe(item, index, arr)
            ) : (
              <div className="listMessage_item">
                {chatWith.type === 'single'
                  ? renderMessageForSingle(item, index, arr)
                  : renderMessageForGroup(item, index, arr)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMain;
