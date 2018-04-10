import React from 'react';
import { render, shallow } from 'enzyme';

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

    const component = render(<Photo photo={photo} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the thumbnail', () => {
    const photo = {
      src: 'http://example.com/photo.jpg',
      thumbnail: 'http://example.com/thumbnail.jpg',
      width: 50,
      height: 50,
    };

    const component = shallow(<Photo photo={photo} />);
    const img = component.find('img').filterWhere(item => {
      return item.prop('src') === photo.thumbnail;
    });
    expect(img).toHaveLength(1);
  });
});
