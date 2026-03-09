import { useTheme } from "@/context/ThemeProvider";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  childrenClassName?: string;
  title?: string;
  className?: string;
};

export const Card = ({
  children,
  childrenClassName,
  title,
  className,
}: Props) => {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "rounded-xl border shadow-md p-4 flex flex-col gap-4 bg-card",
        className,
        theme != "dark"
          ? "border-amber-50"
          : "bg-linear-to-br from-card to-card/60",
      )}>
      <h3 className="text-md md:text-xl lg:text-2xl">{title}</h3>
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_3s_ease-out_forwards]",
        )}>
        {children}
      </div>
    </div>
  );
};
