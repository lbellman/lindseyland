"use client"
import { create } from "zustand";

type ThemeType = "primary" | "secondary" | "dark";
export type ThemeStoreType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: "primary",
  setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
