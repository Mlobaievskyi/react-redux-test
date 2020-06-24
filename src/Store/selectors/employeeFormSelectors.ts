import { createSelector } from "reselect";
import dayjs from "dayjs";

import { availableSortingSystem } from "Constants/sorting";

type Items = [
  {
    timestamp: Date;
    name: string;
    id: string;
  }
];

export const stateSelector = (state: any) => state.form;

export const selectEmployeeFormItems = createSelector(
  stateSelector,
  (form) => form.items
);
export const selectEmployeeFormSorting = createSelector(
  stateSelector,
  (form) => form.sorting as string
);

export const selectItems = createSelector(
  selectEmployeeFormItems,
  selectEmployeeFormSorting,
  (items: Items, sorting: string) =>
    items.sort((a, b) => {
      switch (sorting) {
        case availableSortingSystem.dateAsc:
          return dayjs(a.timestamp).second() - dayjs(b.timestamp).second();
        case availableSortingSystem.dateDesc:
          return dayjs(b.timestamp).second() - dayjs(a.timestamp).second();
        case availableSortingSystem.name:
          return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;

        default:
          return 0;
      }
    })
);
