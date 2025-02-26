import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || "",

  login: async (username, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });

    localStorage.setItem("token", res.data.token);

    set({ token: res.data.token });
  },

  register: async (username, password) => {
    await axios.post("http://localhost:5000/api/auth/register", { username, password });
  },

  logout: () => {
    localStorage.removeItem("token");
    
    set({ token: "" });
  }
}));

export default useAuthStore;