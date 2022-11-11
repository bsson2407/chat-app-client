import { Backdrop, Dialog, DialogContent, Modal } from '@material-ui/core';
import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import BaseModal from '../../chat-header/call-modal/base-model.component';
import './fileMessage.styles.scss';

const FileMessage = ({ fileUrl, message, fileLink }: any) => {
  const [pathFile, setPathFile] = useState('');
  const [viewFile, setViewFile] = useState(false);
  const [docText, setDocText] = useState<any>(null);
  useEffect(() => {
    setPathFile(fileUrl.split('.')[fileUrl.split('.').length - 1]);
  }, []);

  const handleCloseModal = () => {
    setViewFile(false);
  };

  const showViewFile = (file: any) => {
    console.log(fetch(file));
    fetch(file)
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setDocText(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // let read = fetch(file);
    console.log(docText);
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
        <iframe style={{ height: '900px', width: '700px' }} src={file}></iframe>
      </Modal>
      // <Dialog
      //   open={viewFile}
      //   onClose={handleCloseModal}
      //   aria-labelledby="alert-dialog-title"
      //   aria-describedby="alert-dialog-description"
      // >
      //   <DialogContent>
      //     <form style={{ height: '900px', width: '700px' }}>
      //       <div className="title">
      //         <div className="close" onClick={() => handleCloseModal()}></div>
      //       </div>
      //       <iframe
      //         style={{ height: '900px', width: '700px' }}
      //         src={file}
      //       ></iframe>
      //     </form>
      //   </DialogContent>
      // </Dialog>
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
