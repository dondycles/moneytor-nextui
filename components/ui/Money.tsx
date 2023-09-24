"use client";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { DocumentData } from "firebase/firestore";
import { Divider, Button, Chip } from "@nextui-org/react";
import { motion as m } from "framer-motion";
import {
  MdDelete,
  MdEdit,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import React, { useState } from "react";
import { useMoneys } from "@/store";

export default function Money({
  money,
  modify,
}: {
  money: DocumentData;
  modify: (type: "delete" | "edit", money: DocumentData) => void;
}) {
  const [showReasons, setShowReasons] = useState(false);
  const moneysState = useMoneys();
  return (
    <m.div
      layout
      initial={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 40 }}
      className="h-fit w-full items-start  rounded-xl  flex flex-row gap-2"
    >
      <m.div
        layout
        className="flex flex-col gap-2 flex-1 bg-foreground/5 rounded-xl py-2 overflow-hidden px-4"
      >
        <div className="flex items-center gap-1 flex-1">
          <p className="font-bold text-primary text-xl sm:text-2xl">
            {money.source}
          </p>
          <m.p>{money.category.trim("") != "" && `- ${money.category}`}</m.p>
        </div>
        <Divider />
        <Button
          as={"div"}
          onClick={() => setShowReasons((prev) => !prev)}
          className="flex items-center gap-1 rounded-xl text-xl flex-1"
        >
          <p className="text-center font-bold w-full text-primary">
            {moneysState.hideAmount
              ? usePhpPeso(money.amount).replace(/\d/g, "*")
              : usePhpPeso(money.amount)}
          </p>

          {!showReasons ? <MdArrowDropDown /> : <MdArrowDropUp />}
        </Button>
        {showReasons && money.reasons && (
          <div key={"reasons"} className="flex flex-wrap gap-1">
            {money.reasons.slice(0, 3).map((_: unknown, i: number) => {
              return (
                <React.Fragment key={i}>
                  {money.reasons[money.reasons.length - 1 - i].reason.trim() !=
                    "" && (
                    <Chip
                      variant="shadow"
                      color={
                        money.reasons[money.reasons.length - 1 - i]
                          .difference === "decreased"
                          ? "danger"
                          : "success"
                      }
                      className="text-white"
                    >
                      {money.reasons[money.reasons.length - 1 - i].reason}
                    </Chip>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* <button onClick={() => setShowReasons((prev) => !prev)} color="default">
          <p className="text-xs text-center">
            {showReasons ? "hide history" : "show history"}{" "}
          </p>
        </button> */}
      </m.div>
      <div className="flex flex-col gap-2 justify-end h-full">
        <Button
          onClick={() => {
            modify("edit", money);
          }}
          isIconOnly
          variant="shadow"
          color="warning"
          className="text-xl text-white flex-1"
        >
          <MdEdit />
        </Button>
        <Button
          onClick={() => {
            modify("delete", money);
          }}
          isIconOnly
          variant="shadow"
          color="danger"
          className="text-xl flex-1"
        >
          <MdDelete />
        </Button>
      </div>
    </m.div>
  );
}
