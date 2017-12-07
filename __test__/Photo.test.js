import React from 'react';
import Photo from '../src/Photo';
import renderer from 'react-test-renderer';
import photos from './test-photo-data';

function handleClick(){
  return true; 
}
it('renders correctly with onClick', () => {
  const component = renderer.create(
    <Photo src="http://example.com/photo.jpg" width={50} height={50} onClick={handleClick}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.props.onClick();
});

it('renders correctly without onClick', () => {
  const component = renderer.create(
    <Photo src="http://example.com/photo.jpg" width={50} height={50} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


