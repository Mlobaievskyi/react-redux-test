import React from "react";
import dayjs from "dayjs";
import { Radio } from "antd";
import cn from "classnames";

import type { ListItemProps } from "./ListItem.types";
import s from "./ListItem.module.css";

export default ({
  name,
  timestamp,
  selected,
  selectItem,
  actions,
}: ListItemProps) => (
  <div
    className={cn(s.container, selected && s.selectedItem)}
    onClick={selectItem}
  >
    <div className={s.leftSide}>
      <Radio checked={selected} />
      <div className={s.info}>
        <span className={s.name}>{name}</span>
        <span>{dayjs(timestamp).format("MMM-DD mm:ss")}</span>
      </div>
    </div>

    <div className={s.actions}>{actions}</div>
  </div>
);
