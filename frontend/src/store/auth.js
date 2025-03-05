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
  },

  fetchUsername: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/getUsername", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      set({ username: response.data.username });
      return response.data.username; 
      
    } catch (error) {
      console.error("Failed to fetch username", error);
      throw new Error("Error fetching username");
    }
  },
}));

export default useAuthStore;