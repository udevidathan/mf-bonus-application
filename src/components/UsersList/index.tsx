import React from "react";

import { UserItem as Item } from "./UserItem";

import "./_list.scss";

export interface ListProps {
  title?: string;
  showReset?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const ListView: React.FC<ListProps> = ({ children }) => (
  <>
    <div className="admin">{children}</div>
  </>
);

export default Object.assign(ListView, {
  Item,
});
