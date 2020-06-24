import React from "react";
import { mocked } from "ts-jest/utils";
import { shallow, mount } from "enzyme";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";

import NewEmployeeForm from ".";
import { FormActions } from "Store/actions/formActions";

jest.mock("react-redux");
jest.mock("Store/actions/formActions", () => ({
  FormActions: {
    addNewItem: jest.fn(),
  },
}));

describe("NewEmployeeForm component", () => {
  const originalDate = global.Date;
  const originalMathRandom = Math.random;

  const mockedMathRandom = () => 1;
  function mockedDate() {
    return {
      today: "today",
    };
  }

  beforeEach(() => {
    global.Date = originalDate;
    Math.random = originalMathRandom;
    mocked(useDispatch).mockReturnValue((x) => x);
  });

  afterEach(() => {
    mocked(useDispatch).mockReset();
    mocked(FormActions.addNewItem).mockReset();
  });

  test("renders itself", () => {
    const component = shallow(<NewEmployeeForm />);
    expect(component.length).toEqual(1);

    component.unmount();
  });

  test("should add new item", () => {
    global.Date = mockedDate as any;
    Math.random = mockedMathRandom;
    const component = shallow(<NewEmployeeForm />);
    const form = component.find(Form);
    const submitFormCallback = form.prop("onFinish");
    const name = "testName";

    expect(form.length).toEqual(1);
    expect(mocked(FormActions.addNewItem).mock.calls.length).toEqual(0);

    submitFormCallback?.({ name });

    expect(mocked(FormActions.addNewItem).mock.calls.length).toEqual(1);
    expect(mocked(FormActions.addNewItem)).toHaveBeenCalledWith({
      name,
      id: 1,
      timestamp: { today: "today" },
    });

    component.unmount();
  });

  test("should reset fields", () => {
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

    const component = mount(<NewEmployeeForm />);
    const form = component.find(Form);
    const submitFormCallback = form.prop("onFinish");
    let inputComponent = component.find(Input);
    let inputValue = inputComponent.prop("value");

    expect(inputValue).toEqual(undefined);

    inputComponent.simulate("change", { target: { value: "test" } });

    inputComponent = component.find(Input);
    inputValue = inputComponent.prop("value");

    expect(inputValue).toEqual("test");

    submitFormCallback?.({ name: "testName" });
    // force re-render
    component.setProps({});

    inputComponent = component.find(Input);
    inputValue = inputComponent.prop("value");

    expect(inputValue).toEqual(undefined);

    component.unmount();
  });
});
