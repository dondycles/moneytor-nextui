"use client";
import { useMoneys, useTheme } from "@/store";
import {
  Button,
  Divider,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Link from "next/link";
import {
  MdSpaceDashboard,
  MdOutlineManageAccounts,
  MdAnalytics,
  MdDarkMode,
} from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { usePathname } from "next/navigation";
import { BiSolidSortAlt } from "react-icons/bi";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
export default function Nav() {
  const theme = useTheme();
  const moneysState = useMoneys();
  const pathname = usePathname();
  const [sorting, setSorting] = useState({
    sort: [
      { key: "name", value: "Name" },
      { key: "category", value: "Category" },
      { key: "amount", value: "Amount" },
      { key: "dateNow", value: "Date" },
    ],
    order: [
      { key: "asc", value: "Ascending" },
      { key: "desc", value: "Descending" },
    ],
  });
  const pages = [
    { icon: <MdSpaceDashboard />, href: "/dashboard" },
    { icon: <MdAnalytics />, href: "/analytics" },
  ];
  return (
    <nav className="h-full w-fit mb-0 mt-auto rounded-t-xl flex flex-col gap-2 p-1">
      {pages.map((page) => {
        return (
          <Button
            key={page.href}
            isIconOnly
            as={Link}
            href={page.href}
            color={pathname === page.href ? "primary" : "default"}
            variant="shadow"
            className={`text-xl  text-white `}
          >
            {page.icon}
          </Button>
        );
      })}
      <Divider />
      <Button
        onClick={() => {
          if (theme.theme === "dark") {
            theme.setTheme("light");
          } else {
            theme.setTheme("dark");
          }
        }}
        isIconOnly
        color={theme.theme === "dark" ? "primary" : "default"}
        variant="shadow"
        className="text-xl text-white"
      >
        <MdDarkMode />
      </Button>
      <Button
        onClick={() => {
          moneysState.setHideAmount(!moneysState.hideAmount);
        }}
        isIconOnly
        color={moneysState.hideAmount ? "primary" : "default"}
        variant="shadow"
        className="text-xl text-white"
      >
        {!moneysState.hideAmount ? <IoMdEyeOff /> : <IoMdEye />}
      </Button>
      <Popover
        className={`${theme.theme} bg-background p-0 m-0`}
        placement="right-start"
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            color={"primary"}
            variant="shadow"
            className="text-xl text-white"
          >
            <BiSolidSortAlt />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-1 gap-1 m-0">
          <Select
            key={"sortby"}
            color="primary"
            label="Sort By"
            disallowEmptySelection
            variant="bordered"
            className={` ${theme.theme} m-0 p-0 text-foreground`}
            defaultSelectedKeys={[moneysState.sortBy]}
            items={sorting.sort}
          >
            {sorting.sort.map((sort) => {
              return (
                <SelectItem
                  onClick={() => moneysState.setSortBy(sort.key)}
                  color="primary"
                  variant="shadow"
                  key={sort.key}
                >
                  {sort.value}
                </SelectItem>
              );
            })}
          </Select>
          <Select
            key={"order"}
            color="primary"
            label="Direction"
            variant="bordered"
            disallowEmptySelection
            className={` ${theme.theme} m-0 p-0 text-foreground`}
            defaultSelectedKeys={[moneysState.order]}
            items={sorting.order}
          >
            {sorting.order.map((order) => {
              return (
                <SelectItem
                  key={order.key}
                  onClick={() => {
                    moneysState.setOrder(order.key);
                  }}
                  color="primary"
                  variant="shadow"
                >
                  {order.value}
                </SelectItem>
              );
            })}
          </Select>
        </PopoverContent>
      </Popover>
      <div className="mb-0 mt-auto w-full h-auto aspect-square flex items-center justify-center">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
