"use client";

import Nav from "@/components/ui/Nav";
import TotalMoney from "@/components/ui/TotalMoney";
import AddMoneyModal from "@/components/ui/Modals/AddMoneyModal";

import { useAuth, useUser } from "@clerk/nextjs";
import { firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { useMoneys, usePublicMoneyState, useUserState } from "@/store";
import {
  OrderByDirection,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Spinner } from "@nextui-org/react";
import NewUserModal from "@/components/ui/Modals/NewUserModal";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  var _ = require("lodash");

  const publicMoneyState = usePublicMoneyState();
  const privateMoneyState = useMoneys();
  const userState = useUserState();
  const date = new Date();

  const { user, isLoaded, isSignedIn } = useUser();
  const {} = useAuth();

  const [total, setTotal] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);

  const [modalStates, setModalStates] = useState({
    modify: { status: false, type: "", selectedMoney: {} },
    add: false,
  });

  const checkIfNewUser = () => {
    if (user?.createdAt?.toLocaleDateString() === date.toLocaleDateString())
      return userState.setIsNewUser(true);
    return userState.setIsNewUser(false);
  };

  const getMoneys = () => {
    if (!user) return;
    onSnapshot(
      query(
        collection(firestore, "users", user!.id as string, "moneys"),
        orderBy(
          publicMoneyState.sortBy,
          publicMoneyState.order as OrderByDirection
        )
      ),
      (money) => {
        privateMoneyState.setMoneys(
          money.docs.map((m) => ({ id: m.id, ...m.data() }))
        );
        privateMoneyState.setTotal(
          _.sum(money.docs.map((m) => Number(m.data().amount)))
        );
        setTotal(_.sum(money.docs.map((m) => Number(m.data().amount))));
      }
    );

    console.log("moneys...");
  };

  const getHistory = () => {
    if (!user) return;
    onSnapshot(
      query(
        collection(firestore, "users", user!.id as string, "history"),
        orderBy("dateNow", "asc"),
        limitToLast(8)
      ),
      (history) => {
        privateMoneyState.setHistory(
          history.docs.map((history) => ({
            ...history.data(),
            id: history.id,
          }))
        );
      }
    );

    console.log("histories...");
  };

  useEffect(() => {
    if (!hydrated) return;
    getHistory();
  }, [privateMoneyState.moneys]);

  useEffect(() => {
    if (!hydrated) return;
    getMoneys();
  }, [publicMoneyState.order, publicMoneyState.sortBy]);

  useEffect(() => {
    if (!hydrated) return;
    if (!isLoaded) return;
    getHistory();
    getMoneys();
    checkIfNewUser();
  }, [hydrated, isLoaded]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated)
    return (
      <main
        className={`h-full w-full overflow-auto flex flex-row bg-gradient-to-b from-transparent to-primary/10 `}
      >
        {isLoaded ? (
          <>
            {user ? (
              <>
                <Nav />
                <div className="flex max-h-[100dvh] h-screen flex-col flex-1 gap-2 p-1 ">
                  <div className=" overflow-x-hidden overflow-y-auto w-full h-full rounded-xl ">
                    {children}
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
                <NewUserModal />
              </>
            ) : (
              <div className="flex w-full h-full">
                <p className="m-auto">No User...</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full h-full">
            <div className="m-auto flex items-center gap-2">
              <p>Loading User...</p>
              <Spinner />
            </div>
          </div>
        )}
      </main>
    );
}
