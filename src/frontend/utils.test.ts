import { describe, expect, it } from "vitest";

import { mockChannel, mockState } from "./mock";
import { getCurrentChannel } from "./utils";

describe("getCurrentChannel()", () => {
  it("should return nothing if there are no channels", () => {
    const state = {
      ...mockState,
      channels: {},
    };

    expect(getCurrentChannel(state)).toBeUndefined();
  });

  it("should return channel set as current channel", () => {
    const state = {
      ...mockState,
      currentChannel: mockChannel.name,
      channels: {
        [mockChannel.name]: mockChannel,
        "#other-channel": {
          ...mockChannel,
          name: "#other-channel",
        },
      },
    };

    expect(getCurrentChannel(state)).toEqual(mockChannel);
  });

  it("should default to first channel by the channel name", () => {
    const state = {
      ...mockState,
      currentChannel: undefined,
      channels: {
        "#a": { ...mockChannel, name: "#a" },
        "#b": { ...mockChannel, name: "#b" },
        "#c": { ...mockChannel, name: "#c" },
      },
    };

    expect(getCurrentChannel(state)).toHaveProperty("name", "#a");
  });
});
