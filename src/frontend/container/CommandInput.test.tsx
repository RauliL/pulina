import { cleanup, render } from "@testing-library/react";
import { noop } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { afterEach, describe, expect, it } from "vitest";

import CommandInputComponent from "../component/CommandInput";
import { mockChannel, mockState } from "../mock";
import { State, Store } from "../types/store";

import CommandInput from "./CommandInput";

describe("<CommandInput/> container", () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) =>
    render(
      <Provider store={store}>
        <CommandInput
          currentChannel={mockChannel}
          onCommand={noop}
          onCommandError={noop}
        />
      </Provider>,
    );

  afterEach(cleanup);

  it("should read `nick` from Redux state", () => {
    const store = mockStore({
      ...mockState,
      nick: "test",
    });
    const container = renderContainer(store);
    const component = container.find(CommandInputComponent);

    expect(component.prop("nick")).toBe("test");
  });

  it("should read `users` from Redux state", () => {
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
    const component = container.find(CommandInputComponent);

    expect(component.prop("users")).toEqual(["foo", "bar"]);
  });

  it("should work even when there is no current channel", () => {
    const store = mockStore({
      ...mockState,
      currentChannel: undefined,
    });
    const container = renderContainer(store);
    const component = container.find(CommandInputComponent);

    expect(component.prop("users")).toBeUndefined();
  });
});
