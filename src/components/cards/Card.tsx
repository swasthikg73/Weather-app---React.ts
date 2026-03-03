import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  childrenClassName: string;
  title: string;
};

export const Card = ({ children, childrenClassName, title }: Props) => {
  return (
    <div className="rounded-xl bg-zinc-900 shadow-md p-4 flex flex-col gap-4">
      <h3 className="text-2xl">{title}</h3>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};
