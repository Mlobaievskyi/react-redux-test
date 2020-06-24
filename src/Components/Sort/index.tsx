import React from "react";
import { Select } from "antd";

import type { SortProps } from "./Sort.types";
import s from "./Sort.module.css";

const { Option } = Select;

export default ({ options, defaultValue, onChange }: SortProps) => (
  <div className={s.container}>
    <span>Sort: </span>
    <Select
      className={s.select}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options?.map(({ value, label }, index) => (
        <Option key={index} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  </div>
);
