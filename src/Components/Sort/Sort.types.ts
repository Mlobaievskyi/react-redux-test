// @flow
import type { Select } from "antd";

type Option = {
  value: string;
  label: string;
};

export type SortProps = {
  options: Option[];
  defaultValue?: string;
  onChange: (opt: any) => any;
};
