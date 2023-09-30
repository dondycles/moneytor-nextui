"use client";

import Money from "@/components/ui/Money";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { DocumentData } from "firebase/firestore";
import { Button } from "@nextui-org/react";

export default function Dashboard({
  moneys,
  total,
}: {
  moneys: DocumentData[] | null | undefined;
  total: number;
}) {
  var _ = require("lodash");

  const [selectedMoneys, setSelectedMoneys] = useState<DocumentData[]>([]);

  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
  });

  const toggleSelection = (money: DocumentData) => {
    if (selectedMoneys.includes(money)) {
      // If money is already in the array, remove it
      setSelectedMoneys(selectedMoneys.filter((item) => item !== money));
    } else {
      // If money is not in the array, add it
      setSelectedMoneys([...selectedMoneys, money]);
    }
  };

  useEffect(() => {
    console.log(selectedMoneys);
  }, [selectedMoneys]);

  return (
    <>
      <m.div layout className="h-full flex gap-2 flex-col">
        <m.div layout className="h-full flex flex-col gap-2 rounded-xl">
          <AnimatePresence>
            {moneys &&
              moneys.map((money, i) => {
                return (
                  <Money
                    onClick={() => {
                      if (selectedMoneys.includes(money)) {
                        // If money.id is already in the array, remove it
                        setSelectedMoneys(
                          selectedMoneys.filter((item) => item !== money)
                        );
                      } else {
                        // If money.id is not in the array, add it
                        setSelectedMoneys([...selectedMoneys, money]);
                      }
                    }}
                    key={money.id}
                    selectedMoneys={selectedMoneys}
                    modify={(type, money) => {
                      setModalStates({
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

        {selectedMoneys.length > 0 && (
          <Button
            onClick={() =>
              setModalStates({
                modify: {
                  selectedMoney: selectedMoneys,
                  type: "deleteAll",
                  status: true,
                },
              })
            }
            className=" text-xs font-bold"
            variant="shadow"
            color="danger"
          >
            DELETE SELECTED ({selectedMoneys.length})
          </Button>
        )}
      </m.div>

      <ModifyMoneyModal
        total={total}
        modify={{
          money: modalStates.modify.selectedMoney,
          type: modalStates.modify.type as "delete" | "edit" | "deleteAll",
        }}
        isOpen={modalStates.modify.status}
        onOpenChange={() => {
          // ? if a modification is executed, this function will run.

          setSelectedMoneys([]); //? to clear selectedMoneys.
          setModalStates({
            ...modalStates,
            modify: {
              status: !modalStates.modify.status, //? this is to close the modal.

              type: modalStates.modify.type, //? to set and retain data when being toggled.
              selectedMoney: modalStates.modify.selectedMoney,
            },
          });
        }}
      />
    </>
  );
}
