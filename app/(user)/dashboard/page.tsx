"use client";

import Money from "@/components/ui/Money";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { useMoneys } from "@/store";
import { useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

export default function Dashboard() {
  var _ = require("lodash");

  const moneysState = useMoneys();

  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  return (
    <>
      <m.div layout className="h-full flex flex-col gap-2 rounded-xl">
        <AnimatePresence>
          {moneysState.moneys.map((money) => {
            return (
              <Money
                key={money.id}
                modify={(type, money) => {
                  setModalStates({
                    add: false,
                    modify: {
                      status: true,
                      type: type,
                      selectedMoney: money,
                    },
                  });
                }}
                money={money}
              />
            );
          })}
        </AnimatePresence>
      </m.div>

      <ModifyMoneyModal
        modify={{
          money: modalStates.modify.selectedMoney,
          type: modalStates.modify.type as "delete" | "edit",
        }}
        isOpen={modalStates.modify.status}
        onOpenChange={() =>
          setModalStates({
            ...modalStates,
            modify: {
              status: !modalStates.modify.status,
              type: modalStates.modify.type,
              selectedMoney: modalStates.modify.selectedMoney,
            },
          })
        }
      />
    </>
  );
}
