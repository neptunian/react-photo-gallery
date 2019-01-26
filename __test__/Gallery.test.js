import React from 'react';
import Gallery from '../src/Gallery';
import photos from './test-photo-data';
import { mount } from 'enzyme';

function handleClick(){
  return true; 
}

describe('Gallery', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper && wrapper.length > 0) {
      wrapper.unmount();
    } 
  });

  it('renders correctly', () => {
    wrapper = mount(
      <Gallery photos={photos} onClick={handleClick}/>
    );
    wrapper.setState({containerWidth: 1139})
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly if there are more columns than photos', () => {
    wrapper = mount(
      <Gallery photos={photos} columns={10} onClick={handleClick}/>
    );
    wrapper.setState({containerWidth: 1139})
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly after click', () => {
    wrapper = mount(
      <Gallery photos={photos} onClick={handleClick} />
    );
    wrapper.setState({containerWidth: 1139})
    wrapper.find('img').first().simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with direction set to column', () => {
    wrapper = mount(
      <Gallery photos={photos} onClick={handleClick} direction={'column'}/>
    );
    wrapper.setState({containerWidth: 1139})
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with a column function', () => {
    const columns = jest.fn(_ => 3);
    wrapper = mount(
      <Gallery photos={photos} onClick={handleClick} columns={columns}/>
    );
    wrapper.setState({containerWidth: 1139})
    expect(columns).toBeCalledWith(1139);
    expect(wrapper).toMatchSnapshot();
  });

  it('unmounts', () => {
    wrapper = mount(<Gallery photos={photos} />);
    wrapper.setState({containerWidth: 500});
    wrapper.unmount();
  });
})
