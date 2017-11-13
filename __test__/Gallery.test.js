import React from 'react';
import Gallery from '../src/Gallery';
import renderer from 'react-test-renderer';
import photos from './test-photo-data';

function createNodeMock(element) {
	return {
		clientWidth: 1139
	};
}
it('renders correctly', () => {
	const options = {createNodeMock};
  const tree = renderer.create(
    <Gallery photos={photos} />,
		options
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
