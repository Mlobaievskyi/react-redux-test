import { FormTypes as Types } from "Store/actions/formActions";
import { createReducer } from "Services/reduxHelpers";

export interface formReducerInitialState {
  items: { id: number; name: string; timestamp: Date }[];
  sorting: string;
}

const initDate = new Date();

export const initialState: formReducerInitialState = {
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

export default createReducer(initialState, {
  [Types.ADD_NEW_ITEM]: (
    state: typeof initialState,
    { item }: { item: Object }
  ) => ({
    items: [...state.items, item],
  }),
  [Types.CHANGE_SORTING]: (
    state: typeof initialState,
    { sorting }: { sorting: string }
  ) => ({
    sorting,
  }),
  [Types.REMOVE_ITEM]: (
    state: typeof initialState,
    { id }: { id: number }
  ) => ({
    items: state.items.filter((item) => item.id !== id),
  }),
});
