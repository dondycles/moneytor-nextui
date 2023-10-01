"use client";
import { BsDot } from "react-icons/bs";
import { useUser } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import { useRandomColor } from "@/lib/hooks/useRandomColor";
import { useEffect, useState } from "react";
import { useMoneys, useTheme } from "@/store";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  Cell,
  AreaChart,
  Area,
} from "recharts";
export default function Analytics() {
  const theme = useTheme();
  const privateMoneyState = useMoneys();

  const { isSignedIn } = useUser();

  const [hydrated, setHydrated] = useState(false);
  const [categorizedMoney, setCategorizedMoney] = useState<DocumentData[]>([]);

  const gradientOffset = () => {
    if (!privateMoneyState.history) return;
    const dataMax = Math.max(
      ...privateMoneyState.history.map((i) => i.insertedAmount)
    );
    const dataMin = Math.min(
      ...privateMoneyState.history.map((i) => i.insertedAmount)
    );

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const categorizeMoney = () => {
    if (!isSignedIn || !privateMoneyState.moneys) return;
    if (!hydrated) return;

    const categorizedDataMap = new Map();

    privateMoneyState.moneys.forEach((money) => {
      const { category, amount, source } = money;

      if (categorizedDataMap.has(category)) {
        // If the category exists in the map, update its total and sources
        const existingCategory = categorizedDataMap.get(category);
        existingCategory.total += Number(amount);
        existingCategory.sources.push({ amount, category, source });
      } else {
        // If the category doesn't exist in the map, create a new category
        categorizedDataMap.set(category, {
          category,
          total: Number(amount),
          sources: [{ amount, category, source }],
          color: useRandomColor(),
        });
      }
    });

    console.log("categorizing...");

    setCategorizedMoney(Array.from(categorizedDataMap.values()));
  };

  useEffect(() => {
    if (!hydrated) return;
    // getHistory();
    categorizeMoney();
  }, [privateMoneyState.moneys, hydrated]);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (hydrated)
    return (
      <div className=" p-1 pb-0 w-full rounded-l-xl h-full flex justify-start items-center flex-col text-xs gap-2">
        <div className="grid md:grid-cols-2 h-fit w-full gap-2">
          <div className="w-full overflow-auto h-full flex flex-col  bg-black/10 rounded-xl p-2 flex-1 self-stretch">
            <p className="text-sm text-foreground font-semibold text-center">
              Last 8 Transactions
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                className={" box-border"}
                barGap={0}
                data={
                  privateMoneyState.history ? privateMoneyState.history : []
                }
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
                    <stop
                      offset={gradientOffset()}
                      stopColor="green"
                      stopOpacity={1}
                    />
                    <stop
                      offset={gradientOffset()}
                      stopColor="pink"
                      stopOpacity={1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="insertedAmount"
                  stroke={theme.theme === "light" ? "#444" : "#ddd"}
                  fill="url(#splitColor)"
                  type="monotone"
                />
                <Area
                  dataKey="total"
                  stroke={theme.theme === "light" ? "#444" : "#ddd"}
                  fill="#06b6d4"
                  type="monotone"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="w-full rounded-xl flex justify-evenly bg-black/50">
              <p className=" text-green-200 flex items-center">
                <span className="text-4xl">
                  <BsDot />
                </span>
                Added
              </p>
              <p className=" text-pink-200 flex items-center">
                <span className="text-4xl">
                  <BsDot />
                </span>
                Deducted
              </p>
              <p className=" text-[#06b6d4] flex items-center">
                <span className="text-4xl">
                  <BsDot />
                </span>
                Total
              </p>
            </div>
          </div>
          <div className="w-full overflow-auto h-full flex flex-col bg-black/10 rounded-xl p-2 flex-1 self-stretch">
            <p className="text-sm text-foreground font-semibold text-center">
              Categories
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart barGap={0} data={categorizedMoney} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="category"
                  stroke="#06b6d4"
                  fontSize={12}
                  tickLine={true}
                  axisLine={true}
                />
                <YAxis fontSize={12} tickLine={true} axisLine={true} />
                <Tooltip contentStyle={{ color: "blueviolet" }} />

                <ReferenceLine y={0} stroke="#06b6d4" />

                <Bar
                  dataKey="total"
                  stroke={theme.theme === "light" ? "#444" : "#ddd"}
                  fill="#06b6d4"
                  stackId="b"
                  radius={[4, 4, 4, 4]}
                >
                  {categorizedMoney &&
                    categorizedMoney.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categorizedMoney[index].color}
                      />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
}
