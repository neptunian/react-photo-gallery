import React from 'react';
import Gallery from '../src/Gallery';
import renderer from 'react-test-renderer';
import photos from './test-photo-data';
import { shallow, mount, render  } from 'enzyme';

it('renders correctly', () => {
  const component = renderer.create(
    <Gallery photos={photos} clientWidth={1139}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
