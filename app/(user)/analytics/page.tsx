"use client";
import { firestore } from "@/firebase";
import { useMoneys } from "@/store";
import { useUser } from "@clerk/nextjs";
import {
  DocumentData,
  OrderByDirection,
  collection,
  getDocs,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import React, { PureComponent } from "react";

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
  PieChart,
  Pie,
  Sector,
  Cell,
  Label,
  AreaChart,
  Area,
} from "recharts";

export default function Analytics() {
  const { isLoaded, user } = useUser();
  const moneysState = useMoneys();
  const [data, setData] = useState<DocumentData[]>([]);
  const [categorizedData, setCategorizedData] = useState<DocumentData[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
  const categorizeMoney = async () => {
    moneysState.moneys.forEach((money: any, i) => {
      const { category, amount, source } = money;

      // Check if a category with the same name exists in the categorizedData array
      const existingCategory = categorizedData.find(
        (item) => item.category === category
      );
      if (existingCategory) {
        // If it exists, push the current money object to its sources array

        existingCategory.total += Number(amount);
        existingCategory.sources.push({ amount, category, source });
      } else {
        // If it doesn't exist, create a new category object and push it to the array

        categorizedData.push({
          category,
          total: Number(amount),
          sources: [{ amount, category, source }],
        });
      }
    });
  };

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.insertedAmount));
    const dataMin = Math.min(...data.map((i) => i.insertedAmount));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  useEffect(() => {
    if (!hydrated) return;
    getAnalytics();
    categorizeMoney();
    console.log(categorizedData);
  }, [user, hydrated, moneysState.moneys]);

  useEffect(() => {
    setHydrated(true);
    setCategorizedData([]);
  }, []);
  if (hydrated)
    return (
      <div className=" p-1 pb-0 w-full rounded-l-xl max-h-screen h-screen overflow-y-auto overflow-x-hidden flex justify-start items-center flex-col text-xs gap-2">
        <div className="grid md:grid-cols-2 h-fit w-full gap-2">
          <div className="w-full overflow-auto h-fit flex flex-col gap-2 bg-black/10 rounded-xl p-2 flex-1 self-stretch">
            <p className="text-sm text-foreground font-semibold text-center">
              Last 8 Transactions
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                className={" box-border"}
                barGap={0}
                data={data}
                stackOffset="sign"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="source"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                />
                <YAxis fontSize={12} tickLine={true} axisLine={true} />
                <Tooltip contentStyle={{ color: "blueviolet" }} />

                <ReferenceLine y={0} stroke="#06b6d4" />
                <defs>
                  <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="pink" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="insertedAmount"
                  stroke="#444"
                  fill="url(#splitColor)"
                  type="monotone"
                />
                <Area
                  dataKey="total"
                  stroke="#444"
                  fill="#06b6d4"
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full overflow-auto h-fit flex flex-col gap-2 bg-black/10 rounded-xl p-2 flex-1 self-stretch">
            <p className="text-sm text-foreground font-semibold text-center">
              Categories
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart barGap={0} data={categorizedData} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="category"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                />
                <YAxis fontSize={12} tickLine={true} axisLine={true} />
                <Tooltip contentStyle={{ color: "blueviolet" }} />

                <ReferenceLine y={0} stroke="#06b6d4" />

                <Bar
                  dataKey="total"
                  stroke="#444"
                  fill="#06b6d4"
                  stackId="b"
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* <div className="w-full min-h-[300px] rounded-xl bg-black/10 overflow-auto">
          {categorizedData &&
            categorizedData.map((category) => {
              return (
                <div key={category.category} className="p-4">
                  <p>{category.category}</p>
                  <ul>
                    {category.sources.map((source: { amount: number }) => {
                      return <li>{source.amount}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
        </div> */}
      </div>
    );
}
