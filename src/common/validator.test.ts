import { describe, expect, it } from "vitest";

import { isValidChannel, isValidNick } from "./validator";

describe("isValidChannel()", () => {
  it.each([
    ["#test", true],
    ["#test1", true],
    ["#test-test", true],
    ["#test_test", true],
    ["test", false],
    ["#^^^^^", false],
    [`#${"a".repeat(151)}`, false],
    ["", false],
  ])("should be able to validate channel name", (input, expected) => {
    expect(isValidChannel(input)).toBe(expected);
  });
});

describe("isValidNick()", () => {
  it.each([
    ["test", true],
    ["test1", true],
    ["test-test", true],
    ["test_test", true],
    ["#test", false],
    ["^^^^", false],
    [`${"a".repeat(16)}`, false],
    ["", false],
  ])("should be able to validate nickname", (input, expected) => {
    expect(isValidNick(input)).toBe(expected);
  });
});
