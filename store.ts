import { OrderByDirection } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

export const useTheme = create<Theme>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set((state) => ({ theme: theme })),
    }),
    { name: "theme" }
  )
);

type Moneys = {
  sortBy: string;
  setSortBy: (sortyBy: string) => void;
  order: string;
  setOrder: (order: string) => void;
  hideAmount: boolean;
  setHideAmount: (hide: boolean) => void;
};

export const useMoneys = create<Moneys>()(
  persist(
    (set) => ({
      sortBy: "dateNow",
      order: "asc",
      hideAmount: false,
      setSortBy: (sortBy) => set((state) => ({ sortBy: sortBy })),
      setOrder: (order) => set((state) => ({ order: order })),
      setHideAmount: (hide) => set((state) => ({ hideAmount: hide })),
    }),
    { name: "moneys" }
  )
);
