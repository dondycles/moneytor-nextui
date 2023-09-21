"use client";
import { useTheme } from "@/store";
import { Switch } from "@nextui-org/switch";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeButton() {
  const theme = useTheme();
  return (
    <Switch
      onClick={() => {
        if (theme.theme === "dark") {
          theme.setTheme("light");
        } else {
          theme.setTheme("dark");
        }
      }}
      defaultSelected={theme.theme === "light" ? true : false}
      size="lg"
      color="success"
      startContent={<MdLightMode />}
      endContent={<MdDarkMode />}
    >
      Dark mode
    </Switch>
  );
}
