import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  childrenClassName: string;
  title: string;
};

export const Card = ({ children, childrenClassName, title }: Props) => {
  return (
    <div className="rounded-xl bg-card shadow-md p-4 flex flex-col gap-4">
      <h3 className="text-2xl">{title}</h3>
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
