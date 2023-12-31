import { DocumentData } from "firebase/firestore";
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

type User = {
  isNewUser: boolean;
  setIsNewUser: (status: boolean) => void;
  skippedTutorial: boolean;
  setSkippedTutorial: (status: boolean) => void;
  isNotFirstTime: boolean;
  setIsNotFirstTime: (status: boolean) => void;
};

export const useUserState = create<User>()(
  persist(
    (set) => ({
      isNewUser: false,
      setIsNewUser: (status) => set((state) => ({ isNewUser: status })),
      skippedTutorial: false,
      setSkippedTutorial: (status) =>
        set((state) => ({ skippedTutorial: status })),
      isNotFirstTime: false,
      setIsNotFirstTime: (status) =>
        set((state) => ({ isNotFirstTime: status })),
    }),
    { name: "user" }
  )
);

type Moneys = {
  moneys: DocumentData[];
  setMoneys: (moneys: DocumentData[]) => void;
  history: DocumentData[];
  setHistory: (history: DocumentData[]) => void;
  setTotal: (total: number) => void;
  total: number;
};

export const useMoneys = create<Moneys>()((set) => ({
  moneys: [],
  setMoneys: (moneys) => set((state) => ({ moneys: moneys })),
  history: [],
  setHistory: (history) => set((state) => ({ history: history })),
  total: 0,
  setTotal: (total) => set((state) => ({ total: total })),
}));

type PublicMoney = {
  sortBy: string;
  setSortBy: (sortyBy: string) => void;
  order: string;
  setOrder: (order: string) => void;
  hideAmount: boolean;
  setHideAmount: (hide: boolean) => void;
};

export const usePublicMoneyState = create<PublicMoney>()(
  persist(
    (set) => ({
      sortBy: "dateNow",
      order: "asc",
      hideAmount: false,
      setSortBy: (sortBy) => set((state) => ({ sortBy: sortBy })),
      setOrder: (order) => set((state) => ({ order: order })),
      setHideAmount: (hide) => set((state) => ({ hideAmount: hide })),
    }),
    { name: "public-money-state" }
  )
);
