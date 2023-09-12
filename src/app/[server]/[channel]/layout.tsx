import { type ReactNode } from "react";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => (
  <div className="flex-1">layout{children}</div>
);

export default layout;
