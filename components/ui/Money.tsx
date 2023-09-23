"use client";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { DocumentData } from "firebase/firestore";
import { Divider, Button } from "@nextui-org/react";
import { motion as m } from "framer-motion";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { useMoneys } from "@/store";

export default function Money({
  money,
  modify,
}: {
  money: DocumentData;
  modify: (type: "delete" | "edit", money: DocumentData) => void;
}) {
  const [status, setStatus] = useState({ isEditing: false, isDeleting: false });
  const moneysState = useMoneys();
  return (
    <m.div
      initial={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 40 }}
      className="h-fit w-full  rounded-xl  flex flex-row gap-2"
    >
      <div className="flex flex-col gap-2 flex-1 bg-foreground/5 rounded-xl py-1 px-4">
        <div className="flex items-center gap-1 flex-1">
          <p className="font-bold text-primary text-xl sm:text-2xl">
            {money.source}
          </p>
          <p>{money.category.trim("") != "" && `- ${money.category}`}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-1 rounded-xl text-xl flex-1">
          <p className="text-center font-bold w-full text-primary">
            {moneysState.hideAmount
              ? usePhpPeso(money.amount).replace(/\d/g, "*")
              : usePhpPeso(money.amount)}
          </p>
        </div>
        <Divider />
        {money.reasons &&
          money.reasons.map((reason: DocumentData) => {
            return reason.reason;
          })}
      </div>
      <div className="flex flex-col gap-2 justify-end">
        <Button
          onClick={() => {
            setStatus({ isDeleting: true, isEditing: false });
            modify("edit", money);
          }}
          isIconOnly
          variant="shadow"
          color="warning"
          className="text-xl text-white"
        >
          <MdEdit />
        </Button>
        <Button
          onClick={() => {
            setStatus({ isDeleting: true, isEditing: false });
            modify("delete", money);
          }}
          isIconOnly
          variant="shadow"
          color="danger"
          className="text-xl"
        >
          <MdDelete />
        </Button>
      </div>
    </m.div>
  );
}
