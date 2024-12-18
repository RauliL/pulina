import { cleanup, render } from "@testing-library/react";
import { defaultTo, noop } from "lodash";
import React from "react";
import { Button, Navbar } from "reactstrap";
import { afterEach, describe, expect, it, vi } from "vitest";

import { mockChannel } from "../mock";

import ChannelTitle, { Props } from "./ChannelTitle";

describe("<ChannelTitle/>", () => {
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <ChannelTitle
        channel={defaultTo(props.channel, mockChannel)}
        onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
        onToggleUserList={defaultTo(props.onToggleUserList, noop)}
      />,
    );

  afterEach(cleanup);

  it("should render <Navbar/>", () => {
    expect(renderComponent().find(Navbar)).toHaveLength(1);
  });

  it("should render the channel name", () => {
    const component = renderComponent();

    expect(component.find(".navbar-brand").text()).toBe(mockChannel.name);
  });

  it("should render two <Button/>s", () => {
    expect(renderComponent().find(Button)).toHaveLength(2);
  });

  it("should invoke callback when channel list button is clicked", () => {
    const onToggleChannelList = vi.fn();
    const component = renderComponent({ onToggleChannelList });

    component.find(".btn-toggle-channel-list").hostNodes().simulate("click");
    expect(onToggleChannelList).toBeCalled();
  });

  it("should invoke callback when user list button is clicked", () => {
    const onToggleUserList = vi.fn();
    const component = renderComponent({ onToggleUserList });

    component.find(".btn-toggle-user-list").hostNodes().simulate("click");
    expect(onToggleUserList).toBeCalled();
  });
});
