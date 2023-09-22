"use client";
import AddMoney from "@/components/ui/Modals/AddMoneyModal";
import TotalMoney from "@/components/ui/TotalMoney";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";

import { useAuth } from "@clerk/nextjs";
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
import Money from "@/components/ui/Money";

export default function Dashboard() {
  const { userId } = useAuth();

  var _ = require("lodash");
  const [total, setTotal] = useState<number[]>();
  const moneysState = useMoneys();
  const [moneys, setMoneys] = useState<DocumentData[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  const getMoneys = () => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "users", userId as string, "moneys"),
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
    if (!hydrated) return;
    getMoneys();
  }, [moneysState.order, moneysState.sortBy]);

  useEffect(() => {
    if (hydrated) return;
    getMoneys();
    setHydrated(true);
  }, []);

  return (
    <div className="flex-1 w-full p-1 rounded-l-xl max-h-full h-screen flex flex-col gap-2">
      <div className=" overflow-auto h-full flex flex-col gap-2 rounded-xl">
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
      </div>
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
