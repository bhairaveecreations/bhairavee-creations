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
  loading: boolean;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({

  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  /* --------------------------
     Fetch Profile
  -------------------------- */

  fetchProfile: async () => {

    try {

      set({ loading: true });

      const { data } = await api.get("/auth/profile");

      set({ user: data });

    } catch (error) {

      set({ user: null });

    } finally {

      set({ loading: false });

    }

  },

  /* --------------------------
     Logout
  -------------------------- */

  logout: async () => {

    try {

      await api.post("/auth/logout");

    } catch (error) {

      console.error("Logout failed", error);

    } finally {

      set({ user: null });

    }

  }

}));