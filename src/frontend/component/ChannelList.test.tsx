import { defaultTo, noop } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { Button } from "reactstrap";
import createMockStore from "redux-mock-store";
import { afterEach, describe, expect, it, vi } from "vitest";

import { mockChannel } from "../mock";
import { State } from "../types/store";

import ChannelList, { Props } from "./ChannelList";
import ChannelListItem from "./ChannelListItem";
import { cleanup, render } from "@testing-library/react";

describe("<ChannelList/>", () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <Provider store={mockStore()}>
        <ChannelList
          channels={defaultTo(props.channels, [])}
          currentChannel={props.currentChannel}
          onSelectChannel={defaultTo(props.onSelectChannel, noop)}
          onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
        />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render <ul/>", () => {
    expect(renderComponent().find("ul")).toHaveLength(1);
  });

  it("should render <Button/>", () => {
    expect(renderComponent().find(Button)).toHaveLength(1);
  });

  it("should invoke callback when the button is being clicked", () => {
    const onToggleChannelList = vi.fn();
    const component = renderComponent({ onToggleChannelList });

    component.find(Button).simulate("click");
    expect(onToggleChannelList).toBeCalled();
  });

  it("should render each channel with <ChannelListItem/>", () => {
    const component = renderComponent({
      channels: [
        {
          ...mockChannel,
          name: "#channel1",
        },
        {
          ...mockChannel,
          name: "#channel2",
        },
        {
          ...mockChannel,
          name: "#channel3",
        },
      ],
    });

    expect(component.find(ChannelListItem)).toHaveLength(3);
  });

  it("should invoke callback when channel is selected", () => {
    const onSelectChannel = vi.fn();
    const component = renderComponent({
      channels: [mockChannel],
      onSelectChannel,
    });

    component.find(ChannelListItem).at(0).prop("onSelect")();
    expect(onSelectChannel).toBeCalledWith(mockChannel.name);
  });
});
