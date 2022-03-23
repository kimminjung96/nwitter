import { dbService, storageService } from "fbBase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    /* await dbService.collection("nweets").add({
          text: nweet,
          createAt: Date.now(),
          creatorId: userObj.uid,
        });
        setNweet(""); */
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  //console.log(nweets);

  const onFileChange = (event) => {
    //console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //console.log(theFile);
    //파일을 갖고
    const reader = new FileReader();
    //reader를 만든 다음
    reader.onloadend = (finishedEvent) => {
      //console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    //readAsDataURL을 이용해 파일을 읽음
  };
  const onClearPhotClick = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearPhotClick}>Cancel</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
