import React from "react";
import { mocked } from "ts-jest/utils";
import cn from "classnames";
import dayjs from "dayjs";
import { shallow } from "enzyme";

import ListItem from ".";

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
    mocked(dayjs).mockReturnValue({ format: () => "today" } as any);
  });

  afterEach(() => {
    cn.mockReset();
    mocked(dayjs).mockReset();
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
