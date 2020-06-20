// @flow

import React, { useState, useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { newEmployeeSortingOptions } from "Constants/sorting";
import { FormActions } from "Store/actions/formActions";
import {
  selectItems,
  selectEmployeeFormSorting,
} from "Store/selectors/employeeFormSelectors";
import ListItem from "Components/ListItem";
import Sort from "Components/Sort";
import NewEmployeeForm from "./NewEmployeeForm";

import s from "./Form.module.css";

export default () => {
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const items = useSelector(selectItems);
  const sorting = useSelector(selectEmployeeFormSorting);

  const selectItem = useCallback(
    (id) => () => {
      setSelectedItemId(id);
    },
    []
  );

  const changeSorting = useCallback((value) => {
    dispatch(FormActions.changeSorting(value));
  }, []);

  const removeItem = useCallback(
    (id) => (event) => {
      event.stopPropagation();
      dispatch(FormActions.removeItem(id));
    },
    []
  );

  return (
    <div className={s.container}>
      {!!items.length && (
        <Sort
          options={newEmployeeSortingOptions}
          defaultValue={sorting}
          onChange={changeSorting}
        />
      )}

      {items.map(({ name, timestamp, id }, index) => (
        <ListItem
          key={index}
          name={name}
          timestamp={timestamp}
          selected={selectedItemId === id}
          selectItem={selectItem(id)}
          actions={
            <Button danger onClick={removeItem(id)}>
              REMOVE
            </Button>
          }
        />
      ))}

      <NewEmployeeForm />
    </div>
  );
};
