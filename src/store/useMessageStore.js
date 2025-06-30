import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  messages: [],
  users: [],
  isUserLoading: false,
  isMessageLoading: false,
  selectedUser: null,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.messgae);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userID) => {
    set({ isMessageLoading: true });
    const { messages } = get();
    try {
      const res = await axiosInstance.get(`/message/${userID}`);
      set({ messages: res.data });
    } catch (error) {
      // console.log(error);

      toast.error("error");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.messgae);
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  subscribeToMessages: (socket) => {
    const { selectedUser } = get();
    if (!selectedUser || !socket) return;

    socket.on("newMessage", (new_message) => {
      if (new_message.senderID !== selectedUser._id) return;
      set({ messages: [...get().messages, new_message] });
    });
  },
  unsubscribeToMessages: (socket) => {
    // socket.off("newMessage");
  },
}));
