import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendFileRequest,
  sendImagesRequest,
  sendVideoRequest,
} from '../../../redux/actions/ChatAction';
import { RootState } from '../../../redux/reducers';
import './chatfooter.styles.scss';
import EmojiPicker from 'emoji-picker-react';

const ChatFooter = (props: any) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState<string>('');
  const [showPicker, setShowPicker] = useState(false);

  const { socket }: any = useSelector<RootState>((state) => state);
  const { userCurrent }: any = useSelector<RootState>((state) => state.user);
  const { chatWith }: any = useSelector<RootState>((state) => state.chat);
  const [focus, setFocus] = useState<boolean>(false);
  useEffect(() => {
    if (
      focus === true
      //   &&
      //   listMessage[listMessage.length - 1].sender !== userCurrent._id
    ) {
      socket.emit('seen_message', chatWith.idConversation);
    }
  }, [focus, socket, chatWith]);

  const onEmojiClick = (emojiObj: any) => {
    console.log(1);
    setMessage((prev) => prev + emojiObj.emoji);
    console.log(1);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      idConversation: chatWith.idConversation,
      sender: userCurrent._id,
      message: message,
      type: 'TEXT',
    };
    setMessage('');
    socket.emit('send_message', data);
    // socket.emit('seen_message', chatWith.idConversation)
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleFileVideoChange = (e: any) => {
    const files = e.target.files;
    const fileVideo = files[0];
    const reader = new FileReader();
    if (fileVideo) {
      reader.readAsDataURL(fileVideo);
      const formData = new FormData();
      // console.log('is1:', formData);
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      formData.append('video', fileVideo);
      console.log(fileVideo);
      dispatch(sendVideoRequest(formData));
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      const formData = new FormData();
      // console.log('is1:', formData);
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      formData.append('file', file);
      console.log(file);
      dispatch(sendFileRequest(formData));
    }
  };

  const handleFilePhotoChange = (e: any) => {
    const files = e.target.files;
    const fileImage = files[0];
    const reader = new FileReader();
    if (fileImage && fileImage.type.match('image.*')) {
      reader.readAsDataURL(fileImage);
      const formData = new FormData();
      // console.log('is1:', formData);
      formData.append('idSender', userCurrent._id);
      formData.append('idConversation', chatWith.idConversation);
      formData.append('image', fileImage);
      console.log(fileImage);
      dispatch(sendImagesRequest(formData));

      // const data = {
      //   idConversation: chatWith.idConversation,
      //   sender: userCurrent._id,
      //   message: formData,
      //   type: 'IMAGE',
      // };
      // setMessage('');
      // socket.emit('send_message', data);
    }
  };

  return (
    <form
      className="type_message"
      onSubmit={(e) => {
        console.log(2);
        handleSubmitForm(e);
      }}
    >
      <div className="top">
        <div className="list">
          <div className="item">
            <label htmlFor="send_video">
              <i className="fal fa-film"></i>
            </label>
            <input
              type="file"
              id="send_video"
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
              onChange={handleFilePhotoChange}
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
            {focus === true ? (
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
