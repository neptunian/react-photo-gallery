# React Responsive Photo Gallery
A responsive React photo gallery component that uses [React Images] (https://github.com/jossmac/react-images) as a lightbox.

# Use

```jsx
import React from 'react';
import Gallery from 'react-photo-gallery';

export default class Sample extends React.Component {
  render() {
    return (
      <Gallery photos={[gallery_src: 'http://example.com/img1_gallery.jpg', width: 681, height: 1024, ar: 1.5 , src: 'http://example.com/img1_lightbox.jpg']} />
    );
  }
}
```

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
gallery_src     |       string    |       undefined    |       Required. Image used in the gallery collection
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Height of the gallery image
ar | number | undefined | Required. Aspect ratio of the gallery image
photos  | array | undefined | Required. An array of objects containing valid src and srcset values of img element

# srcset

It is possible to serve up different images to the lightbox using srcset which is supported by [React Images] (https://github.com/jossmac/react-images).  The same srcset property can be passed into the photos property.  See react-images documentation for more information on the properties.  More lightbox properties to be supported soon.

#Demo


