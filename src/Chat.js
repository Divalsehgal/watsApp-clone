import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [Seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  console.log(messages);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(
      input,
      user.displayName,
      firebase.firestore.FieldValue.serverTimestamp()
    );

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    const unsubscribe = setSeed(Math.floor(Math.random() * 5000));
    return unsubscribe;
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen
            {
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
              
            }
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>{" "}
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
