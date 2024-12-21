import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it } from "vitest";

import { ClientEventType } from "../../../../../common";
import { ClientContext } from "../../../../context";
import {
  MockClient,
  mockClient,
  mockClientState,
  mockListResult,
  mockRootState,
} from "../../../../mock";
import { AppStore, setupStore } from "../../../../store";
import PopularChannels from "./PopularChannels";

describe("<PopularChannels/>", () => {
  const renderComponent = (client: MockClient, store: AppStore) =>
    render(
      <ClientContext.Provider value={client}>
        <Provider store={store}>
          <PopularChannels />
        </Provider>
      </ClientContext.Provider>,
    );

  afterEach(cleanup);

  it("should send list event", () => {
    const client = mockClient();

    renderComponent(client, setupStore());

    expect(client.events).toEqual([
      {
        type: ClientEventType.LIST,
        query: null,
      },
    ]);
  });

  it("should list each channel returned by list event", () => {
    const { queryByRole } = renderComponent(
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
            {
              ...mockListResult,
              channel: "#b",
            },
          ],
        },
      }),
    );

    expect(queryByRole("button", { name: /#a/i })).toBeInTheDocument();
    expect(queryByRole("button", { name: /#b/i })).toBeInTheDocument();
  });

  it("should dispatch join event when an channel is clicked", async () => {
    const client = mockClient();
    const { getByRole } = renderComponent(
      client,
      setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          listResults: [
            {
              ...mockListResult,
              channel: "#a",
            },
            {
              ...mockListResult,
              channel: "#b",
            },
          ],
        },
      }),
    );

    await userEvent.click(getByRole("button", { name: /#b/i }));

    expect(client.events).toContainEqual({
      type: ClientEventType.JOIN,
      channel: "#b",
    });
  });
});
