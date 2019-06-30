import React from 'react';
import Gallery from '../src/Gallery';
import { photos } from './test-photo-data';
import { mount } from 'enzyme';

const handleClick = jest.fn();

describe('Gallery', () => {
  let wrapper;
  afterEach(() => {
    if (wrapper && wrapper.length > 0) {
      wrapper.unmount();
    }
  });

  it('it matches correct snapshot', () => {
    wrapper = mount(<Gallery photos={photos} onClick={handleClick} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClick handler', () => {
    wrapper = mount(<Gallery photos={photos} onClick={handleClick} />);
    wrapper
      .find('img')
      .first()
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders correctly with direction set to column', () => {
    wrapper = mount(<Gallery photos={photos} direction={'column'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with a column function', () => {
    const columns = jest.fn(_ => 3);
    wrapper = mount(<Gallery photos={photos} onClick={handleClick} columns={columns} direction="column" />);
    expect(columns).toBeCalledWith(1140);
  });
});
