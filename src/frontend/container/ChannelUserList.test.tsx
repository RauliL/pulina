import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { Button } from "reactstrap";
import createMockStore from "redux-mock-store";
import { afterEach, describe, expect, it } from "vitest";

import { toggleUserList } from "../action";
import ChannelUserListComponent from "../component/ChannelUserList";
import { mockChannel, mockState } from "../mock";
import { State, Store } from "../types/store";

import ChannelUserList from "./ChannelUserList";

describe("<ChannelUserList/> container", () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) =>
    render(
      <Provider store={store}>
        <ChannelUserList />
      </Provider>,
    );

  afterEach(cleanup);

  it("should read `channelName` and `users` from Redux state", () => {
    const store = mockStore({
      ...mockState,
      channels: {
        [mockChannel.name]: {
          ...mockChannel,
          users: ["foo", "bar"],
        },
      },
      currentChannel: mockChannel.name,
    });
    const container = renderContainer(store);
    const component = container.find(ChannelUserListComponent);

    expect(component.prop("channelName")).toBe(mockChannel.name);
    expect(component.prop("users")).toEqual(["bar", "foo"]);
  });

  it("should work even when there is no current channel", () => {
    const store = mockStore({
      ...mockState,
      currentChannel: undefined,
    });
    const container = renderContainer(store);
    const component = container.find(ChannelUserListComponent);

    expect(component.prop("channelName")).toBeUndefined();
    expect(component.prop("users")).toEqual([]);
  });

  it("should dispatch Redux action when user list is toggled", () => {
    const store = mockStore();
    const container = renderContainer(store);

    container.find("li").at(0).find(Button).simulate("click");
    expect(store.getActions()).toEqual([
      {
        type: toggleUserList.type,
      },
    ]);
  });
});
