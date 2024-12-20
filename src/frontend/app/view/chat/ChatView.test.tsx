import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it } from "vitest";

import { ClientContext } from "../../../context";
import {
  mockChannel,
  mockClient,
  mockClientState,
  mockRootState,
  mockUIState,
} from "../../../mock";
import { AppStore, setupStore } from "../../../store";
import ChatView from "./ChatView";

describe("<ChatView/>", () => {
  const renderComponent = (store: AppStore) =>
    render(
      <ClientContext.Provider value={mockClient()}>
        <Provider store={store}>
          <ChatView className="" />
        </Provider>
      </ClientContext.Provider>,
    );

  afterEach(cleanup);

  it("should render nothing when there is no channel selected", () => {
    const { baseElement } = renderComponent(
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          channels: {},
        },
        ui: {
          ...mockUIState,
          currentChannel: undefined,
        },
      }),
    );

    expect(baseElement.textContent).toHaveLength(0);
  });

  it("should render name of the channel when channel is selected", () => {
    const { queryByText } = renderComponent(
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          channels: {
            "#test": {
              ...mockChannel,
              name: "#test",
            },
          },
        },
        ui: {
          ...mockUIState,
          currentChannel: "#test",
        },
      }),
    );

    expect(queryByText("#test")).toBeInTheDocument();
  });
});
