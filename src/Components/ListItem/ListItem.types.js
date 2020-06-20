// @flow

import React from "react";

export type ListItemProps = {|
  name: string,
  timestamp: Date,
  selected: boolean,
  actions?: React.Children<>,
  selectItem: () => void,
|};
