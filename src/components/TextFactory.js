import React, { useState } from 'react'
import { db, storage } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TextFactory({userObj}) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChange = e => {
    const {target: {value}} = e;
    setText(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url');
      // console.log(response);
      attachmentUrl = await getDownloadURL(ref(storage, response.ref));
    }

    await addDoc(collection(db, "texts"), {
      text: text,
      createAt: Date.now(),
      createId: userObj.uid,
      attachmentUrl
    });
    setText("");
    setAttachment("");
  }

  const onFileChange = e => {
    // console.log(e.target.files);
    const {target: {files}} = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {currentTarget: {result}} = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => setAttachment("");

  return (
    <footer>
      <form onSubmit={onSubmit}>
        <fieldset className="text_box">
          <legend className="blind">채팅 입력창</legend>
          <label htmlFor="files">
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </label>
          <input type="file" accept='image/*' onChange={onFileChange} id="files" style={{opacity: 0}} className="plus_btn" />
          {attachment ? (attachment &&
            <div className='textForm'>
              <div className='textForm__attachment'>
                <img src={attachment} alt='' style={{backgroundImage: attachment}} />
                <div onClick={onClearAttachment} className='textForm__clear'>
                  <span><FontAwesomeIcon icon="fa-solid fa-xmark" /></span>
                </div>
              </div>
              <input type="text" value="" className="text_field" style={{cursor: "default"}} />
              <span className="emoticon_btn"><i className="fa-regular fa-face-smile"></i></span>
            </div>
          ) : (
            <>
              <input type="text" value={text} onChange={onChange} autoFocus className="text_field" />
              <span className="emoticon_btn"><i className="fa-regular fa-face-smile"></i></span>
            </>
          )}
          {attachment || text ? (
              <input type="submit" value={">"} className="send_btn" />
            ) : (
              <span className="voice_btn"><i className="fa-solid fa-microphone"></i></span>
            )
          }
          
        </fieldset>
      </form>
    </footer>
  )
}

export default TextFactory;