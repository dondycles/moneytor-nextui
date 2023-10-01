"use client";
import { useTheme } from "@/store";
import { NextUIProvider as Provider, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useUser } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
});

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
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
        {isLoaded ? (
          <>
            {user ? (
              children
            ) : (
              <div className="flex w-full h-full">
                <p className="m-auto">No User...</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full h-full">
            <div className="m-auto flex items-center gap-2">
              <p>Loading User...</p>
              <Spinner />
            </div>
          </div>
        )}
      </Provider>
    );
}
