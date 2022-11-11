/* eslint-disable jsx-a11y/iframe-has-title */
import { Backdrop, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './fileMessage.styles.scss';

const FileMessage = ({ fileUrl, message }: any) => {
  const [pathFile, setPathFile] = useState('');
  const [viewFile, setViewFile] = useState(false);
  useEffect(() => {
    setPathFile(fileUrl.split('.')[fileUrl.split('.').length - 1]);
  }, []);

  const handleCloseModal = () => {
    setViewFile(false);
  };

  const showViewFile = (file: any) => {
    console.log(setPathFile(file.split(':')[file.split(':').length + 1]));

    return (
      <Modal
        open={viewFile}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '900px',
          minWidth: '600px',
        }}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <iframe
          style={{ height: '900px', width: '700px' }}
          src={file}
          title=""
        ></iframe>
      </Modal>
    );
  };

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
      {pathFile === 'txt' && (
        <>
          <span onClick={() => setViewFile((e) => !e)}>
            <i className="fal fa-eye"></i>
          </span>
          {viewFile && showViewFile(fileUrl)}
        </>
      )}
    </div>
  );
};

export default FileMessage;
