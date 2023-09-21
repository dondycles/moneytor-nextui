"use client";
import { useTheme } from "@/store";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import {
  MdSpaceDashboard,
  MdOutlineManageAccounts,
  MdAnalytics,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { usePathname } from "next/navigation";
export default function Nav() {
  const theme = useTheme();
  const pathname = usePathname();
  const pages = [
    { icon: <MdSpaceDashboard />, href: "/dashboard" },
    { icon: <MdAnalytics />, href: "/analytics" },
    { icon: <MdOutlineManageAccounts />, href: "/account" },
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
            className={`text-xl  text-white`}
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
    </nav>
  );
}
