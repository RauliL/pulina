import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { noop } from "lodash";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

describe("<ChannelListItem/>", () => {
  const renderComponent = (props: ChannelListItemProps) =>
    render(<ChannelListItem {...props} />);

  afterEach(cleanup);

  it('should render "#" to indicate an channel', () => {
    const { queryByText } = renderComponent({
      hasUnreadHighlights: false,
      hasUnreadMessages: false,
      isActive: false,
      name: "#test-channel",
      onSelect: noop,
    });

    expect(queryByText("#")).toBeInTheDocument();
  });

  it("should render channel name", () => {
    const { queryByText } = renderComponent({
      hasUnreadHighlights: false,
      hasUnreadMessages: false,
      isActive: false,
      name: "#test-channel",
      onSelect: noop,
    });

    expect(queryByText("test-channel")).toBeInTheDocument();
  });

  it("should invoke `onSelect` property when clicked", async () => {
    const onSelect = vi.fn();
    const { getByRole } = renderComponent({
      hasUnreadHighlights: false,
      hasUnreadMessages: false,
      isActive: false,
      name: "#test-channel",
      onSelect,
    });

    await userEvent.click(getByRole("link"));

    expect(onSelect).toBeCalled();
  });
});
