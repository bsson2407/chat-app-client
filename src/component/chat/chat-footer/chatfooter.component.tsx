import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendFileRequest,
  sendImagesRequest,
  sendMessagesRequest,
} from '../../../redux/actions/ChatAction';
import { RootState } from '../../../redux/reducers';
import './chatfooter.styles.scss';
import EmojiPicker from 'emoji-picker-react';

const ChatFooter = (props: any) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);

  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const [focus, setFocus] = useState<boolean>(false);

  // useEffect(() => {
  //   if (
  //     focus === true
  //     //   &&
  //     //   listMessage[listMessage.length - 1].sender !== userCurrent._id
  //   ) {
  //     socket.emit('seen_message', chatWith.idConversation);
  //   }
  // }, [focus, socket, chatWith]);

  const onEmojiClick = (emojiObj: any) => {
    setMessage((prev) => prev + emojiObj.emoji);
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    // const formData = new FormData();

    if (message !== '') {
      const data = {
        idConversation: chatWith.idConversation,
        idSender: userCurrent._id,
        message: message,
      };
      setMessage('');
      await dispatch(sendMessagesRequest(data));
    }
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleFileVideoChange = (e: any) => {
    const files = e.target.files;
    const fileVideo = files[0];
    if (fileVideo) {
      const formData = new FormData();
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      formData.append('file', fileVideo);
      dispatch(sendFileRequest(formData));
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    const file = files[0];
    if (file) {
      const formData = new FormData();

      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      formData.append('file', file);
      dispatch(sendFileRequest(formData));
    }
  };

  const handleFilePhotoChange = (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    if (files) {
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      for (const fileImage of files) {
        if (fileImage) {
          formData.append('files', fileImage);
        }
      }
      dispatch(sendImagesRequest(formData));
    }
  };

  return (
    <form className="type_message" onSubmit={handleSubmitForm}>
      <div className="top">
        <div className="list">
          <div className="item">
            <label htmlFor="send_video">
              <i className="fal fa-film"></i>
            </label>
            <input
              type="file"
              id="send_video"
              accept=".mp4, .avi, .mkl, .webm"
              onChange={handleFileVideoChange}
            ></input>
          </div>
          <div className="item">
            <label htmlFor="send_photo">
              <i className="fal fa-image"></i>
            </label>
            <input
              type="file"
              id="send_photo"
              accept=".png, .PNG, .jpg, .jpeg"
              onChange={handleFilePhotoChange}
              multiple
            ></input>
          </div>
          <div className="item">
            <label htmlFor="send_file">
              <i className="fal fa-file"></i>
            </label>
            <input
              type="file"
              id="send_file"
              onChange={handleFileChange}
            ></input>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="form">
          <input
            placeholder="Nhập tin nhắn ..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onFocus={() => handleFocus()}
            onBlur={() => setFocus(false)}
          ></input>
        </div>
        <div className="list">
          <div className="item" onClick={() => setShowPicker((val) => !val)}>
            <span>
              <i className="fal fa-smile"></i>
            </span>
            {showPicker && (
              <div className="emoji">
                <EmojiPicker
                  lazyLoadEmojis={true}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
          </div>

          <div className="item">
            {message ? (
              <button>
                <span className="like">
                  <i className="fas fa-paper-plane"></i>
                </span>
              </button>
            ) : (
              <span className="like">
                <i className="fas fa-thumbs-up"></i>
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatFooter;
