import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skletons/MessageSkleton";
import MessageInput from "./MessageInput";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    unsubscribeToMessages,
    subscribeToMessages,
  } = useMessageStore();

  const { authUser, currentSocket } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages(currentSocket);

    return () => unsubscribeToMessages(currentSocket);
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className=" flex flex-1 flex-col overflow-hidden">
        <ChatHeader />

        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className=" flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          return (
            <div
              key={message.createdAt}
              className={`chat ${
                message.recieverID === authUser._id ? "chat-start" : "chat-end "
              }`}
              ref={isLastMessage ? messageEndRef : null}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.recieverID === authUser._id
                        ? selectedUser.profilePic || "src/assets/user.png"
                        : authUser.profilePic || "src/assets/user.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div
                className={`chat-bubble flex flex-col ${
                  message.recieverID === authUser._id
                    ? ""
                    : "chat-bubble-primary "
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
