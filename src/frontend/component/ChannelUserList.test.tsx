import { cleanup, render } from "@testing-library/react";
import { defaultTo, noop } from "lodash";
import React from "react";
import { Button } from "reactstrap";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChannelUserList, { Props } from "./ChannelUserList";

describe("<ChannelUserList/>", () => {
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <ChannelUserList
        channelName={props.channelName}
        users={defaultTo(props.users, [])}
        onToggleUserList={defaultTo(props.onToggleUserList, noop)}
      />,
    );

  afterEach(cleanup);

  it("should render <ul/>", () => {
    expect(renderComponent().find("ul")).toHaveLength(1);
  });

  it("should render each user with <li/>", () => {
    const component = renderComponent({
      users: ["test-1", "test-2", "test-3"],
    });

    // It's actually 4 <li/>s because the toggle button is also rendered inside
    // a <li/>.
    expect(component.find("li")).toHaveLength(4);
  });

  it("should render a <Button/>", () => {
    expect(renderComponent().find(Button)).toHaveLength(1);
  });

  it("should invoke callback when <Button/> is being clicked", () => {
    const onToggleUserList = vi.fn();
    const component = renderComponent({ onToggleUserList });

    component.find(Button).simulate("click");
    expect(onToggleUserList).toBeCalled();
  });

  it("should optionally render channel name", () => {
    const component = renderComponent({ channelName: "#test-channel" });

    expect(component.find("li").at(0).text()).toBe("Users on #test-channel");
  });
});
