import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import {
  InfoLogEntry,
  LogEntryType,
  MessageLogEntry,
} from "../../../../client";
import LogEntryListItem, { LogEntryListItemProps } from "./LogEntryListItem";

describe("<LogEntryListItem/>", () => {
  const renderComponent = (props: LogEntryListItemProps) =>
    render(<LogEntryListItem {...props} />);

  afterEach(cleanup);

  it.each([
    {
      id: "2ba52fc8-bf86-11ef-a759-23984454453d",
      isHighlight: false,
      source: "test-user",
      text: "test message",
      timestamp: 1734776864844,
      type: LogEntryType.MESSAGE,
    } as MessageLogEntry,
    {
      id: "2ba52fc8-bf86-11ef-a759-23984454453d",
      text: "test info",
      timestamp: 1734776864844,
      type: LogEntryType.INFO,
    } as InfoLogEntry,
    {
      id: "2ba52fc8-bf86-11ef-a759-23984454453d",
      text: "test error",
      timestamp: 1734776864844,
      type: LogEntryType.ERROR,
    } as InfoLogEntry,
  ])("should render every type of log entry", (entry) => {
    const { queryByText } = renderComponent({ entry });

    expect(queryByText(entry.text)).toBeInTheDocument();
  });
});
