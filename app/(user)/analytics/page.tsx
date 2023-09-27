"use client";
import { firestore } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import {
  DocumentData,
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsFillPieChartFill, BsBarChartFill } from "react-icons/bs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

export default function Analytics() {
  const { isLoaded, user } = useUser();
  const [data, setData] = useState<DocumentData[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const getAnalytics = async () => {
    if (!user) {
      setTimeout(getAnalytics, 1000);
      return;
    }
    const analytics = await getDocs(
      query(
        collection(firestore, "users", user.id as string, "history"),
        orderBy("dateNow", "asc"),
        limitToLast(8)
      )
    );

    setData(
      analytics.docs.map((history) => ({ ...history.data(), id: history.id }))
    );
  };

  useEffect(() => {
    getAnalytics();
  }, [user, hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <div className="flex-1  w-full p-4 rounded-l-xl max-h-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-center flex-col text-xs gap-2">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
          data={data}
          stackOffset="sign"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="createdAt"
            stroke="#ffffff"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#ffffff"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar
            dataKey="insertedAmount"
            stackId="stack"
            fill="#ffffff"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="total"
            stackId="stack"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
