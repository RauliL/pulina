import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import { mockLogEntry } from "../../../../mock";
import LogEntryList, { LogEntryListProps } from "./LogEntryList";

describe("<LogEntryList/>", () => {
  const renderComponent = (props: LogEntryListProps) =>
    render(<LogEntryList {...props} />);

  afterEach(cleanup);

  it("should render each log entry with <LogEntryListItem/>", () => {
    const { queryAllByTestId } = renderComponent({
      list: [
        {
          ...mockLogEntry,
          id: "1",
        },
        {
          ...mockLogEntry,
          id: "2",
        },
        {
          ...mockLogEntry,
          id: "3",
        },
      ],
    });

    expect(queryAllByTestId("LogEntryListItem")).toHaveLength(3);
  });
});
