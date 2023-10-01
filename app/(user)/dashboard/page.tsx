"use client";

import Money from "@/components/ui/Money";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  DocumentData,
  OrderByDirection,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Button } from "@nextui-org/react";
// import { firestore } from "@/firebase";
// import { useUser } from "@clerk/nextjs";
import { useMoneys, usePublicMoneyState } from "@/store";

export default function Dashboard() {
  var _ = require("lodash");

  // const publicMoneyState = usePublicMoneyState();
  const privateMoneyState = useMoneys();

  // const { user } = useUser();

  // const [total, setTotal] = useState<number>(0);
  // const [moneys, setMoneys] = useState<DocumentData[] | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
  });
  const [selectedMoneys, setSelectedMoneys] = useState<DocumentData[]>([]);

  // const getMoneys = () => {
  //   if (!user) return;

  //   onSnapshot(
  //     query(
  //       collection(firestore, "users", user.id as string, "moneys"),
  //       orderBy(
  //         publicMoneyState.sortBy,
  //         publicMoneyState.order as OrderByDirection
  //       )
  //     ),
  //     (money) => {
  //       setMoneys(money.docs.map((m) => ({ id: m.id, ...m.data() })));

  //       setTotal(_.sum(money.docs.map((m) => Number(m.data().amount))));
  //     }
  //   );
  //   console.log("getting moneys...");
  // };

  // useEffect(() => {
  //   if (!hydrated) return;
  //   // getMoneys();
  //   // console.log(privateMoneyState.moneys);
  // }, [publicMoneyState.order, publicMoneyState.sortBy, hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <m.div layout className="h-full flex gap-2 flex-col">
        <m.div layout className="h-full flex flex-col gap-2 rounded-xl">
          <AnimatePresence>
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
        total={privateMoneyState.total}
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
