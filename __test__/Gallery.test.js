import React from 'react';
import Gallery from '../src/Gallery';
import photos from './test-photo-data';
import { shallow, mount, render  } from 'enzyme';

function handleClick(){
  return true; 
}
it('renders correctly', () => {
  const component = mount(
    <Gallery photos={photos} onClick={handleClick}/>
  );
  component.setState({containerWidth: '1139'})
  expect(component).toMatchSnapshot();
});
it('renders correctly after click', () => {
  const component = mount(
    <Gallery photos={photos} onClick={handleClick} />
  );
  component.find('img').first().simulate('click');
  expect(component).toMatchSnapshot();
});

it('renders correctly with direction set to column', () => {
  const component = mount(
    <Gallery photos={photos} onClick={handleClick} direction={'column'}/>
  );
  component.setState({containerWidth: '1139'})
  expect(component).toMatchSnapshot();
});

it('unmounts', () => {
  const wrapper = mount(<Gallery photos={photos} />);
  wrapper.setState({'containerWidth':500});
  wrapper.unmount();
});
