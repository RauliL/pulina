import { defaultTo, noop } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { describe, expect, it } from "vitest";

import CommandInput from "../container/CommandInput";
import { mockChannel } from "../mock";
import { State } from "../types/store";

import ChannelDisplay, { Props } from "./ChannelDisplay";
import ChannelTitle from "./ChannelTitle";
import LogEntryList from "./LogEntryList";
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "node:test";

describe("<ChannelDisplay/>", () => {
  const mockStore = createMockStore<State>();
  const renderComponent = (props: Partial<Props> = {}) =>
    render(
      <Provider store={mockStore()}>
        <ChannelDisplay
          channel={defaultTo(props.channel, mockChannel)}
          onCommand={defaultTo(props.onCommand, noop)}
          onCommandError={defaultTo(props.onCommandError, noop)}
          onToggleChannelList={defaultTo(props.onToggleChannelList, noop)}
          onToggleUserList={defaultTo(props.onToggleUserList, noop)}
        />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render <ChannelTitle/>", () => {
    expect(renderComponent().find(ChannelTitle)).toHaveLength(1);
  });

  it("should render <LogEntryList/>", () => {
    expect(renderComponent().find(LogEntryList)).toHaveLength(1);
  });

  it("should render <CommandInput/>", () => {
    expect(renderComponent().find(CommandInput)).toHaveLength(1);
  });
});
