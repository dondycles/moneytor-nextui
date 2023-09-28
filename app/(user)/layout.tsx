"use client";
import { useUser } from "@clerk/nextjs";
import Nav from "@/components/ui/Nav";
import ModifyMoneyModal from "@/components/ui/Modals/ModifyMoneyModal";
import AddMoneyModal from "@/components/ui/Modals/AddMoneyModal";
import TotalMoney from "@/components/ui/TotalMoney";
import { useMoneys } from "@/store";
import { useEffect, useState } from "react";
import {
  DocumentData,
  OrderByDirection,
  collection,
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

  const { isLoaded, user } = useUser();

  const [total, setTotal] = useState<number[]>();
  const [moneys, setMoneys] = useState<DocumentData[] | null>(null);
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

    onSnapshot(
      query(
        collection(firestore, "users", user.id as string, "moneys"),
        orderBy(moneysState.sortBy, moneysState.order as OrderByDirection)
      ),
      (money) => {
        setMoneys(money.docs.map((m) => ({ id: m.id, ...m.data() })));
        setTotal(money.docs.map((m) => Number(m.data().amount)));
      }
    );
  };

  useEffect(() => {
    if (moneys) moneysState.setMoneys(moneys);
  }, [moneys]);

  useEffect(() => {
    if (!hydrated && !user) return;
    getMoneys();
  }, [user, hydrated, moneysState.order, moneysState.sortBy]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="h-full w-full overflow-auto flex flex-row bg-gradient-to-b from-transparent to-primary/10">
      <Nav />
      {hydrated && isLoaded ? (
        <div className="flex  flex-col flex-1 gap-2 ">
          {children}
          <TotalMoney
            total={_.sum(total)}
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
