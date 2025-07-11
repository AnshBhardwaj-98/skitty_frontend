import React from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useMessageStore } from "../store/useMessageStore";

const HomePage = () => {
  const { selectedUser } = useMessageStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-12 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden ">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
