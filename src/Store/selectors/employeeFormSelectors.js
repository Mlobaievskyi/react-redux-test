// @flow

import { createSelector } from "reselect";
import dayjs from "dayjs";

import { availableSortingSystem } from "Constants/sorting";

export const selectEmployeeFormItems = ({ form }: Object) => form.items;
export const selectEmployeeFormSorting = ({ form }: Object) => form.sorting;

export const selectItems: Object = createSelector<*, *, *, *, *, *>(
  selectEmployeeFormItems,
  selectEmployeeFormSorting,
  (items, sorting) =>
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
