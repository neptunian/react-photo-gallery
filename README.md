# React Responsive Photo Gallery
A responsive React photo gallery component that uses [React Images](https://github.com/jossmac/react-images) as a lightbox.

## Use

```jsx
import React from 'react';
import Gallery from 'react-photo-gallery';

export default class Sample extends React.Component {
    render() {
	return (
	    <Gallery
	      photos={PHOTO_SET}
	    />
	);
    }
}

const PHOTO_SET = [
  {
    gallery_src: 'http://example.com/example/img1_small.jpg',
    src: 'http://example.com/example/img1_large.jpg',
    width: 681,
    height: 1024,
    ar: 1.5
  },
  {
    gallery_src: 'http://example.com/example/img2_small.jpg',
    src: 'http://example.com/example/img2_large.jpg',
    width: 600,
    height: 600,
    ar: 1
  }
];

```

### Photo properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
gallery_src     |       string    |       undefined    |       Required. Image used in the gallery collection
src     |       string    |       undefined    |       Required. Image used for the lightbox
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Required. Height of the gallery image
ar | number | undefined | Required. Aspect ratio of the gallery image

## srcset

It is possible to serve up different images to the lightbox using srcset which is supported by [React Images](https://github.com/jossmac/react-images).  The same srcset property can be passed into the photos property.  See react-images documentation for more information on the properties.  More lightbox properties to be supported soon.

## Demo

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.
