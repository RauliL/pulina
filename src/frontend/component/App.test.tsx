import { cleanup, render } from "@testing-library/react";
import { defaultTo, noop } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

import ChannelList from "../container/ChannelList";
import ChannelUserList from "../container/ChannelUserList";
import MainDisplay from "../container/MainDisplay";
import { State } from "../types/store";

import App, { Props } from "./App";
import { afterEach } from "node:test";

describe("<App/>", () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <Provider store={mockStore()}>
        <App
          channelListVisible={defaultTo(props.channelListVisible, false)}
          userListVisible={defaultTo(props.userListVisible, false)}
          socket={{
            on: noop,
            emit: noop,
            close: noop,
          }}
        />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render <ChannelList/>", () => {
    expect(renderComponent().find(ChannelList)).toHaveLength(1);
  });

  it("should render <MainDisplay/>", () => {
    expect(renderComponent().find(MainDisplay)).toHaveLength(1);
  });

  it("should render <ChannelUserList/>", () => {
    expect(renderComponent().find(ChannelUserList)).toHaveLength(1);
  });
});
