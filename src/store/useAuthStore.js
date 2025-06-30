import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://skitty-server.onrender.com";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  currentSocket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      // console.log("error in checkAuth state" + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (FormData) => {
    set({ isSignup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", FormData);
      set({ authUser: res.data });
      if (get.authUser) get().connectSocket();
      toast.success("Account created successfully");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      return error;
    } finally {
      set({ isSignup: false });
    }
  },

  authLogin: async (LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", LoginData);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      return error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  authlogout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      // console.log(error);
    }
  },
  updateProfile: async (base64image) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post("/auth/update-dp", base64image);
      set({ authUser: res.data });
      toast.success("profile updated");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().currentSocket?.connected) return;
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
      query: {
        userID: authUser._id,
      },
    });
    socket.on("connect", () => {
      // console.log("connected to a socket");

      set({ currentSocket: socket });
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on("disconnect", (reason) => {});
  },
  disconnectSocket: () => {
    const socket = get().currentSocket;
    if (socket?.connected) {
      socket.disconnect();

      set({ currentSocket: null });
    }
  },
}));
