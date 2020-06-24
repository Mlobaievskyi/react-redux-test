// @flow

import React from "react";
import { mocked } from "ts-jest/utils";
import { shallow, mount } from "enzyme";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { FormActions } from "Store/actions/formActions";
import { availableSortingSystem } from "Constants/sorting";
import Sort from "Components/Sort";
import ListItem from "Components/ListItem";
import NewEmployeeForm from "./NewEmployeeForm";

import Form from "./";

jest.mock("react-redux");
jest.mock("Store/actions/formActions", () => ({
  FormActions: {
    removeItem: jest.fn(),
    changeSorting: jest.fn(),
  },
}));

const mockedEmptyReduxState = {
  form: {
    items: [],
    sorting: availableSortingSystem.dateAsc,
  },
};

const mockedItemsReduxState = {
  form: {
    items: [
      {
        name: "First",
        timestamp: new Date(2020, 1, 1),
        id: 1,
      },
      {
        name: "Second",
        timestamp: new Date(2020, 2, 2),
        id: 2,
      },
    ],
    sorting: availableSortingSystem.dateAsc,
  },
};

describe("Form component", () => {
  const stopPropagationSpy = jest.fn();

  beforeEach(() => {
    mocked(useDispatch).mockReturnValue((x) => x);
  });

  afterEach(() => {
    mocked(useDispatch).mockReset();
    mocked(useSelector).mockReset();
    mocked(FormActions.removeItem).mockReset();
    mocked(FormActions.changeSorting).mockReset();
    stopPropagationSpy.mockReset();
  });

  test("render itself", () => {
    mocked(useSelector).mockImplementation((fn) => fn(mockedEmptyReduxState));
    const component = shallow(<Form />);
    const ListItems = component.find(ListItem);
    const SortItems = component.find(Sort);
    const NewEmployeeFormComponent = component.find(NewEmployeeForm);

    expect(ListItems.length).toEqual(0);
    expect(SortItems.length).toEqual(0);
    expect(NewEmployeeFormComponent.length).toEqual(1);
    expect(mocked(useSelector).mock.calls.length).toBe(2);
    expect(component).toHaveLength(1);
    component.unmount();
  });

  test("render with items", () => {
    mocked(useSelector).mockImplementation((fn) => fn(mockedItemsReduxState));
    const component = shallow(<Form />);
    const ListItems = component.find(ListItem);
    const SortItems = component.find(Sort);

    expect(ListItems.length).toEqual(2);
    expect(SortItems.length).toEqual(1);

    expect(component).toHaveLength(1);
    component.unmount();
  });

  test("list item sorting", () => {
    const changedSorting = {
      form: {
        items: [...mockedItemsReduxState.form.items].reverse(),
        sorting: availableSortingSystem.dateDesc,
      },
    };

    mocked(useSelector).mockImplementationOnce((fn) =>
      fn(mockedItemsReduxState)
    );

    const component = shallow(<Form />);
    let SortItem = component.find(Sort);

    expect(mocked(FormActions.changeSorting).mock.calls.length).toEqual(0);

    const onChangeSorting = SortItem.prop("onChange");
    onChangeSorting(availableSortingSystem.dateAsc);

    expect(mocked(FormActions.changeSorting).mock.calls.length).toEqual(1);
    expect(FormActions.changeSorting).toHaveBeenCalledWith(
      availableSortingSystem.dateAsc
    );

    onChangeSorting(availableSortingSystem.dateDesc);

    expect(mocked(FormActions.changeSorting).mock.calls.length).toEqual(2);
    expect(FormActions.changeSorting).toHaveBeenCalledWith(
      availableSortingSystem.dateDesc
    );

    component.unmount();
  });

  test("list item click", () => {
    mocked(useSelector).mockImplementation((fn) => fn(mockedItemsReduxState));
    const component = shallow(<Form />);
    let ListItems = component.find(ListItem);

    expect(ListItems.at(0).prop("selected")).toEqual(false);
    expect(ListItems.at(1).prop("selected")).toEqual(false);

    const callback = (index: number) => ListItems.at(index).prop("selectItem");
    callback(0)();

    ListItems = component.find(ListItem);
    expect(ListItems.at(0).prop("selected")).toEqual(true);
    expect(ListItems.at(1).prop("selected")).toEqual(false);

    callback(1)();

    ListItems = component.find(ListItem);
    expect(ListItems.at(0).prop("selected")).toEqual(false);
    expect(ListItems.at(1).prop("selected")).toEqual(true);

    component.unmount();
  });

  test("remove item", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    mocked(useSelector).mockImplementation((fn) => fn(mockedItemsReduxState));
    const component = mount(<Form />);
    let ListItems = component.find(ListItem);
    const firstListItem = ListItems.at(0);

    expect(ListItems.length).toEqual(2);

    const firstListItemRemoveButton = firstListItem.find(Button);
    expect(stopPropagationSpy.mock.calls.length).toEqual(0);
    expect(mocked(FormActions.removeItem).mock.calls.length).toEqual(0);

    firstListItemRemoveButton.simulate("click", {
      stopPropagation: stopPropagationSpy,
    });

    expect(stopPropagationSpy.mock.calls.length).toEqual(1);
    expect(mocked(FormActions.removeItem).mock.calls.length).toEqual(1);
    expect(mocked(FormActions.removeItem)).toHaveBeenCalledWith(1);

    component.unmount();
  });
});
