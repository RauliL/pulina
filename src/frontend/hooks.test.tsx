import { renderHook } from "@testing-library/react";
import React, { FunctionComponent, ReactNode } from "react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { ClientContext } from "./context";
import {
  useClient,
  useCurrentChannel,
  useCurrentNick,
  useIsConnected,
} from "./hooks";
import {
  mockChannel,
  mockClient,
  mockClientState,
  mockRootState,
  mockUIState,
} from "./mock";
import { AppStore, setupStore } from "./store";

describe("useClient()", () => {
  it("should throw exception when client is not available", () => {
    expect(() => renderHook(useClient)).toThrowError();
  });

  it("should return client when it's available through context", () => {
    const client = mockClient();
    const wrapper: FunctionComponent<{ children: ReactNode }> = ({
      children,
    }) => (
      <ClientContext.Provider value={client}>
        {children}
      </ClientContext.Provider>
    );
    const hook = renderHook(useClient, { wrapper });

    expect(hook.result.current).toBe(client);
  });
});

describe("useCurrentChannel()", () => {
  const render = (store: AppStore) => {
    const wrapper: FunctionComponent<{ children: ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    return renderHook(useCurrentChannel, { wrapper });
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

    expect(hook.result.current).toHaveProperty("name", "#a");
  });
});

describe("useCurrentNick()", () => {
  const render = (store: AppStore) => {
    const wrapper: FunctionComponent<{ children: ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    return renderHook(useCurrentNick, { wrapper });
  };

  it.each([undefined, "test-nick"])(
    "should read the current nickname from the Redux state",
    (nick) => {
      const store = setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          nick,
        },
      });
      const hook = render(store);

      expect(hook.result.current).toEqual(nick);
    },
  );
});

describe("useIsConnected()", () => {
  const render = (store: AppStore) => {
    const wrapper: FunctionComponent<{ children: ReactNode }> = ({
      children,
    }) => <Provider store={store}>{children}</Provider>;

    return renderHook(useIsConnected, { wrapper });
  };

  it.each([
    [undefined, false],
    ["test-nick", true],
  ])(
    "it should determine connection status by looking at the nickname from Redux state",
    (nick, expected) => {
      const store = setupStore({
        ...mockRootState,
        client: {
          ...mockClientState,
          nick,
        },
      });
      const hook = render(store);

      expect(hook.result.current).toBe(expected);
    },
  );
});
