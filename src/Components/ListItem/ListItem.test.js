// @flow

import React from "react";
import ListItem from "./";
import cn from "classnames";
import dayjs from "dayjs";
import { shallow } from "enzyme";

const mockedListItem = {
  name: "Test name",
  timestamp: new Date(2020, 1, 1),
  id: 1,
};

jest.mock("classnames");
jest.mock("dayjs");

describe("ListItem component tests", () => {
  beforeEach(() => {
    cn.mockReturnValue("testClassName");
    dayjs.mockReturnValue({ format: () => "today" });
  });

  afterEach(() => {
    cn.mockReset();
    dayjs.mockReset();
  });

  test("renders itself", () => {
    const component = shallow(
      <ListItem
        name={mockedListItem.name}
        timestamp={mockedListItem.timestamp}
        selected={false}
        selectItem={() => {}}
      />
    );

    expect(component).toHaveLength(1);
    component.unmount();
  });

  it("renders proper data", () => {
    const component = shallow(
      <ListItem
        name={mockedListItem.name}
        timestamp={mockedListItem.timestamp}
        selected={false}
        selectItem={() => {}}
      />
    );

    const spans = component.find("span");
    const name = spans.at(0).prop("children");
    const date = spans.at(1).prop("children");

    expect(name).toEqual(mockedListItem.name);
    expect(date).toEqual("today");
    expect(component.hasClass("testClassName")).toBe(true);

    component.unmount();
  });
});
