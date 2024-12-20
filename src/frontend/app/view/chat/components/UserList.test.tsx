import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import {
  mockChannel,
  mockChannelUser,
  mockRootState,
  mockUIState,
} from "../../../../mock";
import { AppStore, setupStore } from "../../../../store";
import UserList, { UserListProps } from "./UserList";
import { Provider } from "react-redux";

describe("<UserList/>", () => {
  const renderComponent = (
    props: UserListProps,
    store: AppStore = setupStore(),
  ) =>
    render(
      <Provider store={store}>
        <UserList {...props} />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render channel name", () => {
    const { queryByText } = renderComponent({
      channel: { ...mockChannel, name: "#test-channel" },
    });

    expect(queryByText(/users on #test-channel/i)).toBeInTheDocument();
  });

  it("should render each user in the channel with <UserListItem/>", () => {
    const { queryAllByTestId } = renderComponent({
      channel: {
        ...mockChannel,
        users: [
          {
            ...mockChannelUser,
            nick: "First",
          },
          {
            ...mockChannelUser,
            nick: "Second",
          },
          {
            ...mockChannelUser,
            nick: "Third",
          },
        ],
      },
    });

    expect(queryAllByTestId("UserListItem")).toHaveLength(3);
  });

  it.each([true, false])(
    "should toggle user list visibility when a button is clicked",
    async (showUserList) => {
      const store = setupStore({
        ...mockRootState,
        ui: {
          ...mockUIState,
          showUserList,
        },
      });
      const { getByTestId } = renderComponent({ channel: mockChannel }, store);

      await userEvent.click(getByTestId("ToggleUserListButton"));

      expect(store.getState()).toHaveProperty(
        ["ui", "showUserList"],
        !showUserList,
      );
    },
  );
});
