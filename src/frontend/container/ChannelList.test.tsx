import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Button } from "reactstrap";
import createMockStore from "redux-mock-store";
import { afterEach, describe, expect, it } from "vitest";

import { changeCurrentChannel, toggleChannelList } from "../action";
import ChannelListComponent from "../component/ChannelList";
import ChannelListItem from "../component/ChannelListItem";
import { mockChannel, mockState } from "../mock";
import { State, Store } from "../types/store";

import ChannelList from "./ChannelList";

describe("<ChannelList/> container", () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) =>
    render(
      <Provider store={store}>
        <ChannelList />
      </Provider>,
    );

  afterEach(cleanup);

  it("should read value of `channels` from Redux store", () => {
    const store = mockStore({
      ...mockState,
      channels: {
        "#test-channel-3": {
          ...mockChannel,
          name: "#test-channel-3",
        },
        "#test-channel-1": {
          ...mockChannel,
          name: "#test-channel-1",
        },
        "#test-channel-2": {
          ...mockChannel,
          name: "#test-channel-2",
        },
      },
    });
    const container = renderContainer(store);
    const component = container.find(ChannelListComponent);

    expect(component.prop("channels")).toEqual([
      {
        ...mockChannel,
        name: "#test-channel-1",
      },
      {
        ...mockChannel,
        name: "#test-channel-2",
      },
      {
        ...mockChannel,
        name: "#test-channel-3",
      },
    ]);
  });

  it("should read value of `currentChannel` from Redux store", () => {
    const store = mockStore({
      ...mockState,
      currentChannel: "#test-channel",
    });
    const container = renderContainer(store);
    const component = container.find(ChannelListComponent);

    expect(component.prop("currentChannel")).toBe("#test-channel");
  });

  it("should dispatch Redux action when channel is selected", () => {
    const store = mockStore({
      ...mockState,
      channels: { [mockChannel.name]: mockChannel },
    });
    const container = renderContainer(store);

    container.find(ChannelListItem).at(0).find("a").simulate("click");
    expect(store.getActions()).toEqual([
      {
        payload: mockChannel.name,
        type: changeCurrentChannel.type,
      },
    ]);
  });

  it("should dispatch Redux action when channel list is toggled", () => {
    const store = mockStore();
    const container = renderContainer(store);

    container.find("li").at(0).find(Button).simulate("click");
    expect(store.getActions()).toEqual([
      {
        type: toggleChannelList.type,
      },
    ]);
  });
});
