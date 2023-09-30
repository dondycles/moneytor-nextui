"use client";
import { firestore } from "@/firebase";
import { usePublicMoneyState } from "@/store";
import { useUser } from "@clerk/nextjs";
import {
  OrderByDirection,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

var _ = require("lodash");

const publicMoneys = usePublicMoneyState();
const { user } = useUser();

export const getAsyncMoneys = async () => {
  if (!user) return;
  console.log("getting moneys...");

  const { docs } = await getDocs(
    query(
      collection(firestore, "users", user.id as string, "moneys"),
      orderBy(publicMoneys.sortBy, publicMoneys.order as OrderByDirection)
    )
  );

  const data = docs.map((money) => money.data());

  return data;
};
