import sun from "../assets/Icons/sun.svg";
import moon from "../assets/Icons/moon.svg";
import { Switch } from "./ui/switch";
import { useTheme } from "@/context/ThemeProvider";

export const LightDarkToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <img src={sun} className="size-4 icons" alt="" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <img src={moon} className="size-4 icons" alt="" />
    </div>
  );
};
