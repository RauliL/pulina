import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it } from "vitest";

import { mockChannel } from "../../../../mock";
import { setupStore } from "../../../../store";
import ChannelTitle, { ChannelTitleProps } from "./ChannelTitle";

describe("<ChannelTitle/>", () => {
  const renderComponent = (props: ChannelTitleProps) =>
    render(
      <Provider store={setupStore()}>
        <ChannelTitle {...props} />
      </Provider>,
    );

  afterEach(cleanup);

  it("should render channel name", () => {
    const { queryByText } = renderComponent({
      channel: { ...mockChannel, name: "#test" },
    });

    expect(queryByText("#test")).toBeInTheDocument();
  });

  it("should render channel topic, when the channel has one", () => {
    const { queryByText } = renderComponent({
      channel: { ...mockChannel, topic: "This is the topic." },
    });

    expect(queryByText("This is the topic.")).toBeInTheDocument();
  });
});
