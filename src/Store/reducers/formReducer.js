// @flow

import { FormTypes as Types } from "Store/actions/formActions";
import { createReducer } from "Services/reduxHelpers";

type initialStateType = {
  items: Object[],
};

const initDate = new Date();

export const initialState: initialStateType = {
  items: [
    {
      name: "Last name",
      timestamp: initDate,
      id: 2,
    },
    {
      name: "First name",
      timestamp: initDate,
      id: 1,
    },
  ],
  sorting: "date-asc",
};

export default (createReducer(initialState, {
  [Types.ADD_NEW_ITEM]: (state, { item }) => ({
    items: [...state.items, item],
  }),
  [Types.CHANGE_SORTING]: (state, { sorting }) => ({
    sorting,
  }),
  [Types.REMOVE_ITEM]: (state, { id }) => ({
    items: state.items.filter((item) => item.id !== id),
  }),
}): Object);
