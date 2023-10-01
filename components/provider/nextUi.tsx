"use client";
import { useTheme } from "@/store";
import { NextUIProvider as Provider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
});

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (hydrated)
    return (
      <Provider
        className={`${theme.theme} ${montserrat.className} text-xs sm:text-base bg-background max-h-[100dvh] h-screen w-full text-foreground`}
      >
        {children}
      </Provider>
    );
}
