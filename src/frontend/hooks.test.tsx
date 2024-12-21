import { renderHook } from "@testing-library/react";
import React, { FunctionComponent, ReactNode } from "react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { useCurrentChannel } from "./hooks";
import {
  mockChannel,
  mockClientState,
  mockRootState,
  mockUIState,
} from "./mock";
import { AppStore, setupStore } from "./store";

describe("useCurrentChannel()", () => {
  const render = (store: AppStore) => {
    const wrapper: FunctionComponent<{ children: ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    return renderHook(() => useCurrentChannel(), { wrapper });
  };

  it("should return nothing if there are no channels", () => {
    const store = setupStore({
      ...mockRootState,
      client: {
        ...mockClientState,
        channels: {},
      },
    });
    const hook = render(store);

    expect(hook.result.error).toBeUndefined();
    expect(hook.result.current).toBeUndefined();
  });

  it("should return channel set as current channel", () => {
    const store = setupStore({
      ...mockRootState,
      client: {
        ...mockClientState,
        channels: {
          [mockChannel.name]: mockChannel,
          "#other-channel": {
            ...mockChannel,
            name: "#other-channel",
          },
        },
      },
      ui: {
        ...mockUIState,
        currentChannel: mockChannel.name,
      },
    });
    const hook = render(store);

    expect(hook.result.error).toBeUndefined();
    expect(hook.result.current).toBe(mockChannel);
  });

  it("should default to first channel by the channel name", () => {
    const store = setupStore({
      ...mockRootState,
      client: {
        ...mockClientState,
        channels: {
          "#a": { ...mockChannel, name: "#a" },
          "#b": { ...mockChannel, name: "#b" },
          "#c": { ...mockChannel, name: "#c" },
        },
      },
      ui: {
        ...mockUIState,
        currentChannel: undefined,
      },
    });
    const hook = render(store);

    expect(hook.result.error).toBeUndefined();
    expect(hook.result.current).toHaveProperty("name", "#a");
  });
});
