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
import React, { MouseEventHandler, useState } from "react";
import { usePublicMoneyState } from "@/store";

export default function Money({
  money,
  modify,
  onClick,
  selectedMoneys,
}: {
  money: DocumentData;
  modify: (type: "delete" | "edit", money: DocumentData) => void;
  onClick: MouseEventHandler<HTMLDivElement>;
  selectedMoneys: DocumentData[];
}) {
  const [showReasons, setShowReasons] = useState(false);
  const publicMoneyState = usePublicMoneyState();

  return (
    <m.div
      layout
      onClick={onClick}
      initial={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 40 }}
      className="h-fit w-full items-start  rounded-xl  flex flex-row gap-2"
    >
      <m.div
        layout
        className={`flex flex-col gap-2 flex-1 rounded-xl py-2 overflow-hidden px-4 ${
          selectedMoneys.includes(money) ? "bg-warning/20 " : "bg-foreground/5 "
        }`}
      >
        <m.div layout className="flex items-center gap-1 flex-1">
          <m.p layout className="font-bold text-primary text-xl sm:text-2xl">
            {money.source}
          </m.p>
          <m.p>{money.category.trim("") != "" && `- ${money.category}`}</m.p>
        </m.div>
        <Divider />
        <m.button
          layout
          onClick={(e) => {
            e.stopPropagation();
            setShowReasons((prev) => !prev);
          }}
          className="flex items-center gap-1 rounded-xl text-xl flex-1"
        >
          <m.p layout className="text-center font-bold w-full text-primary">
            {publicMoneyState.hideAmount
              ? usePhpPeso(money.amount).replace(/\d/g, "*")
              : usePhpPeso(money.amount)}
          </m.p>
          {money.reasons && money.reasons.length != 0 && (
            <>{!showReasons ? <MdArrowDropDown /> : <MdArrowDropUp />}</>
          )}
        </m.button>

        {showReasons && money.reasons && (
          <m.div layout key={"reasons"} className="flex flex-wrap gap-1">
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
          </m.div>
        )}
      </m.div>
      {selectedMoneys.length === 0 && (
        <m.div layout className="flex flex-col gap-2 justify-end h-full">
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
        </m.div>
      )}
    </m.div>
  );
}
