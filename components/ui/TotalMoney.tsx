"use client";
import { Button } from "@nextui-org/button";
import { HiOutlinePlusSmall } from "react-icons/hi2";
export default function TotalMoney({
  onOpen,
  total,
}: {
  onOpen: () => void;
  total: string;
}) {
  return (
    <>
      <footer className="flex flex-row gap-2 mb-0 mt-auto">
        <p className="w-full h-full rounded-xl flex items-center justify-center font-bold text-primary backdrop-blur bg-foreground/5 text-base">
          Total: {total}
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
