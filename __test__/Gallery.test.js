import React from 'react';
import Gallery from '../src/Gallery';
import renderer from 'react-test-renderer';
import photos from './test-photo-data';
import { shallow, mount, render  } from 'enzyme';

function createNodeMock(element) {
	return {
		clientWidth: 1139
	};
}
function handleClick(){
  return true; 
}
it('renders correctly with onClick', () => {
	const options = {createNodeMock};
  const component = renderer.create(
    <Gallery photos={photos} onClick={handleClick}/>,
		options
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[0].children[0].props.onClick();
  expect(tree).toMatchSnapshot();
});

it('unmounts', () => {
  const wrapper = mount(<Gallery photos={photos} />);
  wrapper.setState({'containerWidth':500});
  wrapper.unmount();
});
