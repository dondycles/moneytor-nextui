"use client";

import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { Button } from "@nextui-org/react";

export default function Logo() {
  return (
    <div className="aspect-square max-h-[80dvh] m-auto p-4 h-full w-auto  flex flex-row gap-8">
      <div className="w-1/2 h-full  flex flex-col gap-8">
        <div className="aspect-square w-full h-auto bg-transparent flex ">
          <p className="m-auto font-black text-[54px]">Moneytor</p>
        </div>
        <Button
          variant="shadow"
          color="primary"
          isIconOnly
          className="aspect-square w-full h-auto text-[54px] font-black"
        >
          {usePhpPeso(100)}
        </Button>
      </div>
      <div className="w-1/2 h-full  flex flex-col gap-8">
        <Button
          variant="shadow"
          color="warning"
          isIconOnly
          className="aspect-square w-full h-auto"
        />
        <Button
          variant="shadow"
          color="danger"
          isIconOnly
          className="aspect-square w-full h-auto"
        />
      </div>
    </div>
  );
}
