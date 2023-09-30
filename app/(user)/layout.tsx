"use client";
import { useUser } from "@clerk/nextjs";
import Nav from "@/components/ui/Nav";
import AddMoneyModal from "@/components/ui/Modals/AddMoneyModal";
import TotalMoney from "@/components/ui/TotalMoney";
import { usePublicMoneyState } from "@/store";
import { useEffect, useState } from "react";
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

import Analytics from "./analytics/page";
import Dashboard from "./dashboard/page";
import { usePathname } from "next/navigation";

export default function UserLayout() {
  var _ = require("lodash");

  const publicMoneyState = usePublicMoneyState();

  const { isLoaded, user, isSignedIn } = useUser();

  const pathName = usePathname();

  const [total, setTotal] = useState<number>(0);
  const [moneys, setMoneys] = useState<DocumentData[] | null>(null);

  const [hydrated, setHydrated] = useState(false);
  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  const getMoneys = () => {
    if (!user) return;

    onSnapshot(
      query(
        collection(firestore, "users", user.id as string, "moneys"),
        orderBy(
          publicMoneyState.sortBy,
          publicMoneyState.order as OrderByDirection
        )
      ),
      (money) => {
        setMoneys(money.docs.map((m) => ({ id: m.id, ...m.data() })));

        setTotal(_.sum(money.docs.map((m) => Number(m.data().amount))));
      }
    );
    console.log("getting moneys...");
  };

  useEffect(() => {
    if (!hydrated) return;
    getMoneys();
  }, [publicMoneyState.order, publicMoneyState.sortBy, hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="h-full w-full overflow-auto flex flex-row bg-gradient-to-b from-transparent to-primary/10">
      <Nav />
      {hydrated && isLoaded && isSignedIn ? (
        <div className="flex max-h-[100dvh] h-screen flex-col flex-1 gap-2 p-1 ">
          <div className=" overflow-x-hidden overflow-y-auto w-full h-full rounded-xl ">
            {pathName === "/dashboard" && (
              <Dashboard moneys={moneys} total={total} />
            )}
            {pathName === "/analytics" && <Analytics moneys={moneys} />}
          </div>
          <TotalMoney
            total={total}
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
        total={total}
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
