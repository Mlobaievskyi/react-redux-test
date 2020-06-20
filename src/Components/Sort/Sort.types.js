// @flow

type Option = {|
  value: string,
  label: string,
|};

export type SortProps = {|
  options: Option[],
  defaultValue: string,
  onChange: () => void,
|};
