import React, { useState, useEffect } from "react";
import "./Sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ addnewchat, id, name }) {
  const [Seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  const createChat = () => {
    const roomName = prompt("please enter a name for chat");
    if (roomName) {
      db.collection("rooms").add({ name: roomName });
    }
  };
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Seed}.svg`} />
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarchat">
      <h2 onClick={(e) => createChat(e)}>Add new chat</h2>
    </div>
  );
}

export default Sidebarchat;
