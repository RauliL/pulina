import { describe, expect, it } from "vitest";

import { isBlank } from "./utils";

describe("isBlank()", () => {
  it.each([
    ["test", false],
    [" test ", false],
    ["", true],
    [" ", true],
    ["\t", true],
  ])(
    "should be able to detect string containing only whitespaces",
    (input, expected) => {
      expect(isBlank(input)).toBe(expected);
    },
  );
});
