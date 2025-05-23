import { IUser } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MMKVStorage } from "./storage";
type AuthState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logOut: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (data: any) => {
        set({ user: { ...get().user, ...data } });
      },
      logOut: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => MMKVStorage),
    }
  )
);

export { useAuthStore };
