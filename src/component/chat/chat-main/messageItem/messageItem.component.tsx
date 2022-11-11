/* eslint-disable @typescript-eslint/no-redeclare */
import React from 'react';
import { IMessage } from '../../../../redux/types/ChatTypes';
import FileMessage from '../fileMessage/fileMessage.component';
import './messageItem.styles.scss';
export type MessageItem = {
  item: IMessage;
  //   index: number;
  //   arr: IMessage[];
};
const MessageItem = ({ item }: MessageItem) => {
  //   const pathFile = item.urlLink.split('.')[item.urlLink.split('.').length - 1];

  return (
    <div className="message-item">
      {item.type === 'IMAGE' ? (
        item.urlImage.map((url, index) => {
          return <img className="image" alt="img" src={url} key={index} />;
        })
      ) : item.type === 'TEXT' ? (
        <div className="text">{item.message}</div>
      ) : item.type === 'VIDEO' ? (
        <video width="500" height="300" controls>
          <source src={item.urlLink} type="video/mp4" />
        </video>
      ) : item.type === 'FILE' ? (
        <FileMessage
          fileUrl={item.urlLink}
          message={item.message}
          flag={true}
        />
      ) : item.type === 'RECALL' ? (
        <div className="recall-message">{item.message}</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MessageItem;
