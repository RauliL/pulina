import { cleanup, render } from "@testing-library/react";
import { noop } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import { afterEach, describe, expect, it } from "vitest";

import NickFormComponent from "../component/NickForm";
import { mockState } from "../mock";
import { State, Store } from "../types/store";

import NickForm from "./NickForm";

describe("<NickForm/> container", () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) =>
    render(
      <Provider store={store}>
        <NickForm onSubmit={noop} />
      </Provider>,
    );

  afterEach(cleanup);

  it("should read value of `errorMessage` from Redux store", () => {
    const store = mockStore({
      ...mockState,
      nickError: "Test error",
    });
    const container = renderContainer(store);
    const component = container.find(NickFormComponent);

    expect(component.prop("errorMessage")).toBe("Test error");
  });
});
