import React, { useEffect, useState } from 'react';
import { db, storage } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Text({textObj, isOwner}) {
  const [nowDate, setNowDate] = useState(textObj.createAt);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      // console.log(textObj.id);
      // const data = await db.doc(`texts/${textObj.id}`);
      const data = await deleteDoc(doc(db, "texts", `/${textObj.id}`));
      // console.log(data);
      if (textObj.attachmentUrl !== "") {
        const deleteRef = ref(storage, textObj.attachmentUrl);
        await deleteObject(deleteRef);
      }
    }
  }

  useEffect(() => {
    let timeStamp = textObj.createAt;
    const now = new Date(timeStamp);
    // console.log(now);
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    setNowDate(hour + ":" + minute);
  }, []);
  
  return (
    <>
      {textObj.text ? (
        <span className="chat">
          {textObj.text}
          {isOwner && (
            <span onClick={onDeleteClick} className='deleteBtn'>
              <FontAwesomeIcon icon="fa-solid fa-trash" />
            </span>
          )}
          <span className="chat_time">{nowDate}</span>
        </span>
      ) : (
        <span className="chatImg">
          {textObj.attachmentUrl && (
            <img src={textObj.attachmentUrl} alt='' />
          )}
          {isOwner && (
            <span onClick={onDeleteClick} className='deleteBtn'>
              <FontAwesomeIcon icon="fa-solid fa-trash" />
            </span>
          )}
          <span className="chat_time">{nowDate}</span>
        </span>
      )}
    </>
  )
}

export default Text;