import { ClientCommandType } from "../common/command";
import { describe, expect, it } from "vitest";

import { parseCommand } from "./command-parser";
import { mockChannel } from "./mock";

describe("parseCommand()", () => {
  it("should treat non-commands as messages", () =>
    parseCommand(mockChannel, "Test message").then((result) => {
      expect(result).toEqual({
        type: ClientCommandType.MESSAGE,
        channel: mockChannel.name,
        message: "Test message",
      });
    }));

  it("should treat input beginning with `/ /` as a message", () =>
    parseCommand(mockChannel, "/ /Test message").then((result) => {
      expect(result).toEqual({
        type: ClientCommandType.MESSAGE,
        channel: mockChannel.name,
        message: "/Test message",
      });
    }));

  it("should reject unknown commands", () =>
    expect(parseCommand(mockChannel, "/fail")).rejects.toBe(
      "Unknown command.",
    ));

  describe("/join", () => {
    it("should result in error when channel name is missing", () =>
      expect(parseCommand(mockChannel, "/join")).rejects.toBe(
        "Missing channel name.",
      ));

    it("should result in error when channel name is invalid", () =>
      expect(parseCommand(mockChannel, "/join fail")).rejects.toBe(
        "Invalid channel name.",
      ));

    it("should result in join command otherwise", () =>
      parseCommand(mockChannel, "/join #test").then((result) => {
        expect(result).toEqual({
          type: ClientCommandType.JOIN,
          channel: "#test",
        });
      }));
  });

  describe("/part", () => {
    it("should default to current channel name", () => {
      parseCommand(mockChannel, "/part").then((result) => {
        expect(result).toEqual({
          type: ClientCommandType.PART,
          channel: mockChannel.name,
        });
      });
    });

    it("should allow overriding the channel name", () => {
      parseCommand(mockChannel, "/part #test").then((result) => {
        expect(result).toEqual({
          type: ClientCommandType.PART,
          channel: "#test",
        });
      });
    });

    it("should reject invalid channel names", () => {
      expect(parseCommand(mockChannel, "/part fail")).rejects.toBe(
        "Invalid channel name.",
      );
    });
  });
});
