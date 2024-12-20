import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  mockChannel,
  mockClientState,
  mockRootState,
  mockUIState,
} from "../../mock";
import { AppStore, setupStore } from "../../store";
import ChannelList from "./ChannelList";

describe("<ChannelList/>", () => {
  const renderComponent = (store: AppStore) =>
    render(
      <Provider store={store}>
        <ChannelList />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render each channel with <ChannelListItem/>", () => {
    const { queryAllByTestId } = renderComponent(
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          channels: {
            "#a": {
              ...mockChannel,
              name: "#a",
            },
            "#b": {
              ...mockChannel,
              name: "#b",
            },
            "#c": {
              ...mockChannel,
              name: "#c",
            },
          },
        },
      }),
    );

    expect(queryAllByTestId("ChannelListItem")).toHaveLength(3);
  });

  it.each([true, false])(
    "should toggle channel list visibility when a button is clicked",
    async (showChannelList) => {
      const store = setupStore({
        ...mockRootState,
        ui: {
          ...mockUIState,
          showChannelList,
        },
      });
      const { getByTestId } = renderComponent(store);

      await userEvent.click(getByTestId("ToggleChannelListButton"));

      expect(store.getState()).toHaveProperty(
        ["ui", "showChannelList"],
        !showChannelList,
      );
    },
  );
});
