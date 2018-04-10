import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Photo from '../src/Photo';

describe('Photo component', () => {
  it('renders correctly with onClick', () => {
    const mockCallBack = jest.fn();

    const photo = {
      src: 'http://example.com/photo.jpg',
      width: 50,
      height: 50,
    };

    const component = shallow(<Photo photo={photo} onClick={mockCallBack} />);
    component.find('img').simulate('click');

    expect(component).toMatchSnapshot();
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('renders correctly without onClick', () => {
    const photo = {
      src: 'http://example.com/photo.jpg',
      width: 50,
      height: 50,
    };

    const component = renderer.create(<Photo photo={photo} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
