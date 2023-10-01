"use client";

import Money from "@/components/ui/Money";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { Button } from "@nextui-org/button";
import { useMoneys } from "@/store";
import { DocumentData } from "firebase/firestore";
import { AnimatePresence, motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  var _ = require("lodash");
  const privateMoneyState = useMoneys();

  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
  });
  const [selectedMoneys, setSelectedMoneys] = useState<DocumentData[]>([]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated)
    return (
      <>
        <m.div layout className="h-fit w-full flex gap-2 flex-col">
          <AnimatePresence>
            <m.div
              layout
              className="h-full rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              {privateMoneyState.moneys.map((money, i) => {
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
            </m.div>
          </AnimatePresence>

          {selectedMoneys.length > 0 && !modalStates.modify.status && (
            <div className="w-full flex mb-0 mt-auto gap-2 flex-1 ">
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
              <Button
                onClick={() => setSelectedMoneys([])}
                className=" text-xs font-bold text-white"
                variant="shadow"
                color="warning"
              >
                CANCEL
              </Button>
            </div>
          )}
        </m.div>

        <ModifyMoneyModal
          total={privateMoneyState.total}
          modify={{
            money: modalStates.modify.selectedMoney,
            type: modalStates.modify.type as "delete" | "edit" | "deleteAll",
          }}
          isOpen={modalStates.modify.status}
          diselect={(money) => {
            setSelectedMoneys(selectedMoneys.filter((item) => item !== money));
            setTimeout(() => {
              setModalStates({
                modify: {
                  selectedMoney: selectedMoneys.filter(
                    (item) => item !== money
                  ),
                  status: modalStates.modify.status,
                  type: modalStates.modify.type,
                },
              });
            }, 500);
          }}
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
