# React Responsive Photo Gallery
A responsive React photo gallery component that uses [React Images](https://github.com/jossmac/react-images) as a lightbox.

## Demo

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

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
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
    width: 681,
    height: 1024,
    aspect_ratio: 1.5
  },
  {
    gallery_src: 'http://example.com/example/img2_small.jpg',
    src: 'http://example.com/example/img2_large.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
    width: 600,
    height: 600,
    aspect_ratio: 1
  }
];

```

### Photo properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
gallery_src     |       string    |       undefined    |       Required. Image used in the gallery collection
src     |       string    |       undefined    |       Required. Image used for the lightbox
srcset     |       array    |       undefined    |       Optional.  Array of images for the lightbox.
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Required. Height of the gallery image
aspect_ratio | number | undefined | Required. Aspect ratio of the gallery image (width / height)

## srcset

It is possible to serve up different images to the lightbox using srcset which is supported by [React Images](https://github.com/jossmac/react-images).  The same srcset property can be passed into the photos property.  See react-images documentation for more information on the srcset property.
