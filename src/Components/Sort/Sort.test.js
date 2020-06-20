// @flow

import React from "react";
import { shallow } from "enzyme";
import { Select } from "antd";

import Sort from "./";

const { Option } = Select;

describe("Sort component", () => {
  test("renders itself", () => {
    const onChangeSpy = jest.fn();

    const props = {
      options: [],
      defaultValue: "randomDefaultValue",
      onChange: onChangeSpy,
    };

    const component = shallow(<Sort {...props} />);
    const Options = component.find(Option);

    expect(Options.length).toEqual(0);
    component.unmount();
  });

  test("renders itself with options", () => {
    const selectOptions = [
      {
        value: "1",
        label: "First",
      },
      {
        value: "2",
        label: "Second",
      },
    ];

    const props = {
      options: selectOptions,
      defaultValue: "randomDefaultValue",
      onChange: (x) => x,
    };

    const component = shallow(<Sort {...props} />);
    const Options = component.find(Option);

    expect(Options.length).toEqual(2);
    Options.map((item, index) => {
      expect(item.prop("value")).toEqual(selectOptions[index].value);
      expect(item.prop("children")).toEqual(selectOptions[index].label);
    });

    component.unmount();
  });
});
