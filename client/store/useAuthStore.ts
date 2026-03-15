import { create } from "zustand";
import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  fetchProfile: async () => {
    try {
      const { data } = await api.get("/auth/profile");
      set({ user: data });
    } catch {
      set({ user: null });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },
}));