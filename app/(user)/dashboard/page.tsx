"use client";

import Money from "@/components/ui/Money";
import AddMoney from "@/components/ui/Modals/AddMoneyModal";
import TotalMoney from "@/components/ui/TotalMoney";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { Spinner } from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { firestore } from "@/firebase";
import { useMoneys } from "@/store";
import { usePhpPeso } from "@/lib/hooks/phpformatter";
import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";

export default function Dashboard() {
  var _ = require("lodash");

  const moneysState = useMoneys();

  const { isLoaded, user } = useUser();

  const [total, setTotal] = useState<number[]>();
  const [moneys, setMoneys] = useState<DocumentData[]>([]);
  const [reasons, setReasons] = useState<DocumentData[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  const getMoneys = async () => {
    if (!user) {
      // If user is not true, wait for a short time and then try again.
      setTimeout(getMoneys, 1000);
      return;
    }

    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "users", user.id as string, "moneys"),
        orderBy(moneysState.sortBy, moneysState.order as OrderByDirection)
      ),
      (money) => {
        setMoneys(money.docs.map((m) => ({ id: m.id, ...m.data() })));
        setTotal(money.docs.map((m) => Number(m.data().amount)));
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    if (!hydrated && !user) return;
    getMoneys();
  }, [user, hydrated, moneysState.order, moneysState.sortBy]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex-1 w-full p-1 rounded-l-xl max-h-full h-screen flex flex-col gap-2 ">
      {isLoaded && hydrated ? (
        <m.div
          layout
          className=" overflow-auto h-full flex flex-col gap-2 rounded-xl"
        >
          <AnimatePresence>
            {moneys.map((money) => {
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
      ) : (
        <div className="m-auto flex items-center gap-4">
          <span> Loading user...</span> <Spinner />
        </div>
      )}
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
      <AddMoney
        isOpen={modalStates.add}
        onOpenChange={() =>
          setModalStates({
            ...modalStates,
            add: !modalStates.add,
            modify: {
              status: false,
              type: "",
              selectedMoney: modalStates.modify.selectedMoney,
            },
          })
        }
      />
      <TotalMoney
        total={
          moneysState.hideAmount
            ? String(usePhpPeso(_.sum(total)).replace(/\d/g, "*"))
            : String(usePhpPeso(_.sum(total)))
        }
        onOpen={() =>
          setModalStates({
            ...modalStates,
            add: !modalStates.add,
            modify: {
              status: false,
              type: "",
              selectedMoney: modalStates.modify.selectedMoney,
            },
          })
        }
      />
    </div>
  );
}
