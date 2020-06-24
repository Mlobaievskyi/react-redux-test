import type React from "react";

export type ListItemProps = {
  name: string;
  timestamp: Date;
  selected: boolean;
  actions?: React.ReactNode;
  selectItem: () => void;
};
