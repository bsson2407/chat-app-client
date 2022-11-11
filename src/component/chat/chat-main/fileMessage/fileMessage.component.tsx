import React, { useEffect, useState } from 'react';
import './fileMessage.styles.scss';

const FileMessage = ({ fileUrl, message, fileLink }: any) => {
  const [pathFile, setPathFile] = useState('');
  useEffect(() => {
    setPathFile(fileUrl.split('.')[fileUrl.split('.').length - 1]);
  }, []);
  //   const pathFile = fileUrl.split('.')[fileUrl.split('.').length - 1];

  return (
    <div className="message-file">
      {pathFile === 'pdf' ? (
        <img src="images/icons/pdf_icon.png" alt="" />
      ) : pathFile === 'doc' || pathFile === 'docx' ? (
        <img src="images/icons/word_icon.png" alt="" />
      ) : pathFile === 'csv' || pathFile === 'xls' ? (
        <img src="images/icons/excel_icon.png" alt="" />
      ) : pathFile === 'txt' ? (
        <img src="images/icons/txt_icon.png" alt="" />
      ) : (
        ''
      )}
      <span>{message}</span>
      <a href={fileUrl} download>
        <i className="fal fa-download"></i>
      </a>
    </div>
  );
};

export default FileMessage;
