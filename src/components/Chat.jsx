import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const inputRef = useRef();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log(chat?.data?.messages);
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchChatMessages();
    };
    fetchData();
  }, []);

  useEffect(() => {
    //Do not create socket connection if no userId present
    if (!userId) return;

    const socket = createSocketConnection();
    // As soon as the page loaded,
    // the socket connection is made and joinChat event is emitted. TargetuserId is the other person to chat
    socket.emit("joinRoom", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("Message received: ", firstName, text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    //When page unmounts, disconnect the socket connection
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden border border-base-300 mt-2">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, index) => {
          return (
            <>
              <div
                key={index}
                className={
                  "chat " +
                  (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50 ml-2">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              {/* <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  Anakin
                  <time className="text-xs opacity-50 ml-2">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div> */}
            </>
          );
        })}
      </div>
      {/* Input area */}
      <form
        className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="input input-bordered w-full rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="btn btn-primary rounded-full px-6 font-semibold shadow-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
