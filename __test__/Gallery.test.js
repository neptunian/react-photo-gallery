import React from 'react';
import { render, shallow, mount } from 'enzyme';
import photos from './test-photo-data';

import Gallery from '../src/Gallery';

describe('Gallery component', () => {
  let mountElement;

  beforeEach(() => {
    // Create dummy element.
    mountElement = document.createElement('DIV');
    // Set width and height
    mountElement.style.width = 600;
    mountElement.style.height = 600;
    document.body.appendChild(mountElement);
  });

  afterEach(() => {
    mountElement.remove();
  });

  it('renders correctly', () => {
    const component = render(<Gallery photos={photos} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with onClick', () => {
    const ALT = 'DSC02427';
    const mockCallBack = jest.fn();

    // Attach Gallery to element created bellow.
    const options = {
      attachTo: mountElement,
    };

    const component = mount(<Gallery photos={photos} onClick={mockCallBack} />, options);

    component
      .find('img')
      .filterWhere(item => {
        return item.prop('alt') === ALT;
      })
      .simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should change private containerWidth state', () => {
    const options = {
      attachTo: mountElement,
    };

    const component = mount(<Gallery photos={photos} />, options);
    component.setState({ containerWidth: 300 });

    component.instance().forceUpdate();
    component.update();

    expect(component.state().containerWidth).toBe(0);
    // Should be expect(component.state().containerWidth).toBe(300)
    // When airbnb team can solve the following issue
    // https://github.com/airbnb/enzyme/issues/1229
  });

  it('should unmount component', () => {
    const component = mount(<Gallery photos={photos} />);
    component.unmount();
  });
});
