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
  mockRootState,
} from "../../../mock";
import { AppStore, setupStore } from "../../../store";
import ConnectView from "./ConnectView";

describe("<ConnectView/>", () => {
  const renderComponent = (
    client: MockClient = mockClient(),
    store: AppStore = setupStore(),
  ) =>
    render(
      <Provider store={store}>
        <ClientContext.Provider value={client}>
          <ConnectView className="" />
        </ClientContext.Provider>
      </Provider>,
    );

  afterEach(cleanup);

  it("should render error message if user types invalid nickname", async () => {
    const { getByRole, queryByText } = renderComponent();

    await userEvent.type(getByRole("textbox"), "^#-");

    expect(queryByText(/given nickname is invalid/i)).toBeInTheDocument();
  });

  it("should send hello event when user submits the form", async () => {
    const client = mockClient();
    const { getByRole } = renderComponent(client);

    await userEvent.type(getByRole("textbox"), "test");
    await userEvent.click(getByRole("button"));

    expect(client.events).toContainEqual({
      type: ClientEventType.HELLO,
      nick: "test",
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
});
