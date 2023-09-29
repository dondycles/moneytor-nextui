"use client";
import { useUser } from "@clerk/nextjs";
import Nav from "@/components/ui/Nav";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";
import AddMoneyModal from "@/components/ui/Modals/AddMoneyModal";
import TotalMoney from "@/components/ui/TotalMoney";
import { useMoneys, usePublicMoneyState } from "@/store";
import { useEffect, useMemo, useState } from "react";
import {
  DocumentData,
  OrderByDirection,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { Spinner } from "@nextui-org/react";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var _ = require("lodash");

  const moneysState = useMoneys();
  const publicMoneyState = usePublicMoneyState();

  const { isLoaded, user, isSignedIn } = useUser();

  const [total, setTotal] = useState<number>(0);
  const [moneys, setMoneys] = useState<DocumentData[] | null>(null);
  const [history, setHistory] = useState<DocumentData[] | null>(null);

  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  const getMoneys = () => {
    if (!user) return;

    console.log("getting moneys...");

    onSnapshot(
      query(
        collection(firestore, "users", user.id as string, "moneys"),
        orderBy(
          publicMoneyState.sortBy,
          publicMoneyState.order as OrderByDirection
        )
      ),
      (money) => {
        moneysState.setMoneys(
          money.docs.map((m) => ({ id: m.id, ...m.data() }))
        );
        moneysState.setMoneys(
          money.docs.map((m) => ({ id: m.id, ...m.data() }))
        );
        moneysState.setTotal(
          _.sum(money.docs.map((m) => Number(m.data().amount)))
        );
      }
    );
  };

  const getHistory = () => {
    if (!user) return;

    console.log("getting histories...");

    onSnapshot(
      query(
        collection(firestore, "users", user.id as string, "history"),
        orderBy("dateNow", "asc"),
        limitToLast(8)
      ),
      (history) => {
        moneysState.setHistory(
          history.docs.map((history) => ({
            ...history.data(),
            id: history.id,
          }))
        );
      }
    );
  };

  useMemo(getMoneys, [publicMoneyState.order, publicMoneyState.sortBy]);
  useMemo(getHistory, [moneys?.length]);
  useEffect(() => {
    if (!hydrated) return;
    getMoneys();
  }, [hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="h-full w-full overflow-auto flex flex-row bg-gradient-to-b from-transparent to-primary/10">
      <Nav />
      {hydrated && isLoaded && isSignedIn ? (
        <div className="flex max-h-[100dvh] h-screen flex-col flex-1 gap-2 p-1 ">
          <div className=" overflow-x-hidden overflow-y-auto w-full h-full rounded-xl ">
            {children}
          </div>
          <TotalMoney
            total={moneysState.total}
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
      ) : (
        <div className="m-auto flex items-center gap-4">
          <span className="text-xs"> Loading user...</span> <Spinner />
        </div>
      )}
      <AddMoneyModal
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
    </main>
  );
}
