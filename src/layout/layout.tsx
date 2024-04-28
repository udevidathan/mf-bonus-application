import React from "react";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  layoutIdentifier?: string;
}

export const LayoutItem: React.FC<IProps> = ({
  children,
  className,
  layoutIdentifier = "",
}) => {
  let gridClass = "";

  switch (layoutIdentifier) {
    case "listing-web":
      gridClass = "grid gap-4 grid-cols-6 sm:grid-cols-6";
      break;

    case "listing-mobile":
      gridClass = "grid gap-4 grid-cols-1 sm:grid-cols-1";
      break;

    case "listing-hours":
      gridClass = "grid gap-4 grid-cols-1 sm:grid-cols-3";
      break;

    default:
      gridClass = "grid gap-4 grid-cols-1 sm:grid-cols-2";
      break;
  }

  return <div className={`${gridClass} ${className || ""}`}>{children}</div>;
};
