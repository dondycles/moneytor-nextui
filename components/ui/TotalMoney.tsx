"use client";
import { firestore } from "@/firebase";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { useMoneys } from "@/store";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
export default function TotalMoney({
  onOpen,
  total,
}: {
  onOpen: () => void;
  total: number;
}) {
  const { isLoaded, user } = useUser();
  const moneysState = useMoneys();

  const [hydrated, setHydrated] = useState(false);

  useMemo(() => {
    if (!hydrated && !user) return;
    moneysState.setTotal(total);
  }, [total]);

  useEffect(() => {
    setTimeout(() => {
      setHydrated(true);
    }, 5000);
  }, []);
  return (
    <>
      <footer className="flex flex-row gap-2 mb-0 mt-auto">
        <p className="w-full h-full rounded-xl flex items-center justify-center font-bold text-primary backdrop-blur bg-foreground/5 text-base">
          Total:{" "}
          {moneysState.hideAmount
            ? String(usePhpPeso(total).replace(/\d/g, "*"))
            : String(usePhpPeso(total))}
        </p>
        <Button
          onPress={onOpen}
          variant="shadow"
          color="primary"
          isIconOnly
          className="text-2xl font-black text-white"
        >
          <HiOutlinePlusSmall />
        </Button>
      </footer>
    </>
  );
}
