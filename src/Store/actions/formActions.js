// @flow

import { createActions } from "reduxsauce";

const { Creators: FormActions, Types: FormTypes } = createActions(
  {
    addNewItem: ["item"],
    changeSorting: ["sorting"],
    removeItem: ["id"],
  },
  { prefix: "@form/" }
);

export { FormActions, FormTypes };
