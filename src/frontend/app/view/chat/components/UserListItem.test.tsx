import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import UserListItem, { UserListItemProps } from "./UserListItem";

describe("<UserListItem/>", () => {
  const renderComponent = (props: UserListItemProps) =>
    render(<UserListItem {...props} />);

  afterEach(cleanup);

  it("should render nickname of the user", () => {
    const { queryByText } = renderComponent({
      user: { isOperator: false, nick: "test-user" },
    });

    expect(queryByText(/test-user/)).toBeInTheDocument();
  });

  it.each([true, false])(
    'should render "@" in front of the nickname if user is operator',
    (isOperator) => {
      const { queryAllByText } = renderComponent({
        user: { isOperator, nick: "test" },
      });

      expect(queryAllByText(/@/)).toHaveLength(isOperator ? 1 : 0);
    },
  );
});
