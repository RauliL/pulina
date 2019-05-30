import { mount, shallow } from 'enzyme';
import { noop } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import NickFormComponent from '../component/NickForm';
import { mockState } from '../mock';
import { State, Store } from '../types/store';

import NickForm from './NickForm';

describe('<NickForm/> container', () => {
  const mockStore = createMockStore<State>();
  const renderContainer = (store: Store = mockStore()) => (
    <Provider store={store}>
      <NickForm onSubmit={noop}/>
    </Provider>
  );
  const mountContainer = (store: Store = mockStore()) => mount(
    renderContainer(store),
  );

  it('should render without throwing exception', () => {
    expect(shallow(renderContainer()));
  });

  it('should read value of `errorMessage` from Redux store', () => {
    const store = mockStore({
      ...mockState,
      nickError: 'Test error',
    });
    const container = mountContainer(store);
    const component = container.find(NickFormComponent);

    expect(component.prop('errorMessage')).toBe('Test error');
  });
});
