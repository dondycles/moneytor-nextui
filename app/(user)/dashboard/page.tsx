"use client";

import Money from "@/components/ui/Money";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { useMoneys } from "@/store";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

export default function Dashboard() {
  var _ = require("lodash");

  const moneysState = useMoneys();

  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (hydrated)
    return (
      <div className="flex-1 w-full p-1 pb-0 rounded-l-xl max-h-full h-screen overflow-auto">
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
      </div>
    );
}
