type Moneys = {
  total: number;
  userId: string;
  insertedAmount: number;
  source: string;
  difference: string;
};
const date = new Date();
import { firestore } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export const useWriteMoneyHistory = async ({
  total,
  userId,
  insertedAmount,
  source,
  difference,
}: Moneys) => {
  await addDoc(collection(firestore, "users", userId, "history"), {
    source: source,
    insertedAmount: insertedAmount,
    total: total,
    createdAt: date.toLocaleDateString(),
    dateNow: Date.now(),
    difference: difference,
  });
};
