import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it } from "vitest";

import { ClientEventType } from "../../../../common";
import { ClientContext } from "../../../context";
import {
  MockClient,
  mockClient,
  mockClientState,
  mockListResult,
  mockRootState,
} from "../../../mock";
import { AppStore, setupStore } from "../../../store";
import JoinChannelView from "./JoinChannelView";

describe("<JoinChannelView/>", () => {
  const renderComponent = (
    client: MockClient = mockClient(),
    store: AppStore = setupStore(),
  ) =>
    render(
      <ClientContext.Provider value={client}>
        <Provider store={store}>
          <JoinChannelView className="" />
        </Provider>
      </ClientContext.Provider>,
    );

  afterEach(cleanup);

  it("it should request list of most popular channels from the server", () => {
    const client = mockClient();

    renderComponent(client);

    expect(client.events).toContainEqual({
      type: ClientEventType.LIST,
      query: null,
    });
  });

  it("should display error message when user inputs invalid channel name", async () => {
    const { getByRole, queryByText } = renderComponent();

    await userEvent.type(getByRole("textbox"), "invalid channel name");

    expect(queryByText(/given channel name is invalid/i)).toBeInTheDocument();
  });

  it("should send join event when user submits the form", async () => {
    const client = mockClient();
    const { getByRole } = renderComponent(client);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "#test-channel");
    await userEvent.click(getByRole("button"));

    expect(client.events).toContainEqual({
      type: ClientEventType.JOIN,
      channel: "#test-channel",
    });
  });

  it("should render error message if the Redux store contains one", () => {
    const { queryByText } = renderComponent(
      mockClient(),
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          error: "Find me",
        },
      }),
    );

    expect(queryByText(/find me/i)).toBeInTheDocument();
  });

  it("should render the most popular channels list received from the server", () => {
    const { queryByTestId } = renderComponent(
      mockClient(),
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          listResults: [
            {
              ...mockListResult,
              channel: "#a",
            },
          ],
        },
      }),
    );

    expect(queryByTestId("PopularChannels")).toBeInTheDocument();
  });

  it("should not render the most popular channels list if it cannot be queried from the server", () => {
    const { queryByTestId } = renderComponent(
      mockClient(),
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          listResults: undefined,
        },
      }),
    );

    expect(queryByTestId("PopularChannels")).not.toBeInTheDocument();
  });
});
