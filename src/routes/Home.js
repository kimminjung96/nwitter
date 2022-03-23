import Nweet from "components/Nweet";

import { dbService, storageService } from "fbBase";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [nweets, setNweets] = useState([]);

  /* const getNweets = async () => {
    const dbnweets = await dbService.collection("nweets").get();
    dbnweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  }; */
  //옛날 방식 이다. 뭔가가 일어날 떄 마다 getNweets가 실행
  useEffect(() => {
    //getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      //console.log("something happened");
      //console.log(snapshot.docs);
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log(nweetArray);
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
