import { OrderByDirection, addDoc, collection } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { firestore } from "./firebase";

const date = new Date();

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
  setTotal: (total: number) => void;
  total: number;
  writeHistory: (total: number, user: string, insertedAmount: number) => void;
};

export const useMoneys = create<Moneys>()(
  persist(
    (set) => ({
      sortBy: "dateNow",
      order: "asc",
      hideAmount: false,
      total: 0,
      setTotal: (total) => set((state) => ({ total: total })),
      writeHistory: async (total, user, insertedAmount) => {
        await addDoc(collection(firestore, "users", user, "history"), {
          insertedAmount: insertedAmount,
          total: total,
          createdAt: date.toLocaleDateString(),
          dateNow: Date.now(),
        });
      },
      setSortBy: (sortBy) => set((state) => ({ sortBy: sortBy })),
      setOrder: (order) => set((state) => ({ order: order })),
      setHideAmount: (hide) => set((state) => ({ hideAmount: hide })),
    }),
    { name: "moneys" }
  )
);
