import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import LogEntryTimestamp, {
  LogEntryTimestampProps,
} from "./LogEntryTimestamp";

describe("<LogEntryTimestamp/>", () => {
  const renderComponent = (props: LogEntryTimestampProps) =>
    render(<LogEntryTimestamp {...props} />);

  afterEach(cleanup);

  it('should render the given timestamp with "HH:mm" format', () => {
    const { queryByText } = renderComponent({
      timestamp: new Date(2024, 11, 1, 15, 30, 0).getTime(),
    });

    expect(queryByText("15:30")).toBeInTheDocument();
  });
});
