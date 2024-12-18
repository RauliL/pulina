import { defaultTo, noop } from "lodash";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChannelListItem, { Props } from "./ChannelListItem";
import { cleanup, render } from "@testing-library/react";

describe("<ChannelListItem/>", () => {
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <ChannelListItem
        name={defaultTo(props.name, "#test-channel")}
        isActive={defaultTo(props.isActive, false)}
        hasUnreadMessages={defaultTo(props.hasUnreadMessages, false)}
        hasUnreadHighlight={defaultTo(props.hasUnreadHighlight, false)}
        onSelect={defaultTo(props.onSelect, noop)}
      />,
    );

  afterEach(cleanup);

  it("should render <li/>", () => {
    expect(renderComponent().find("li")).toHaveLength(1);
  });

  it("should render <a/>", () => {
    expect(renderComponent().find("a")).toHaveLength(1);
  });

  it("should render channel name without hash", () => {
    const component = renderComponent();

    expect(component.find("a").find("span").text()).toBe("test-channel");
  });

  it("should invoke callback when channel is being selected", () => {
    const onSelect = vi.fn();
    const component = renderComponent({ onSelect });

    component.find("a").simulate("click");
    expect(onSelect).toBeCalled();
  });
});
