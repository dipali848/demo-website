import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import FileSaver from 'file-saver';

export default function ViewImage(props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  const download = require('image-downloader')
 

  
function downloadImage(){
  
    const url= props.imageUrl;
    const path = './screens';
 
  axios.get(url).then(res => {
    console.log('***', res)
    FileSaver.saveAs(res, path);
  });
  
}

  return (
    <Modal
      isOpen={props.modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={props.closeModal}
    >
      <button
        type="button"
        onClick={props.closeModal}
        className="close-button topright"
        data-dismiss="modal"
        aria-hidden="true"
      >
        ×
      </button>

      <div>
        <img alt="#" src={props.imageUrl} />
        <button type="button" onClick={downloadImage}>Download</button>
      </div>
    </Modal>
  );
}
