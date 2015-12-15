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
	    <Gallery photos={PHOTO_SET} />
	);
    }
}

const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1_small.jpg',
    width: 681,
    height: 1024,
    aspectRatio: 1.5,
    lightboxImage:{
	src: 'http://example.com/example/img1_large.jpg',
	srcset: [
	  'http://example.com/example/img1_1024.jpg 1024w',
	  'http://example.com/example/img1_800.jpg 800w',
	  'http://example.com/example/img1_500.jpg 500w',
	  'http://example.com/example/img1_320.jpg 320w',
	]
    }
  },
  {
    src: 'http://example.com/example/img2_small.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
	src: 'http://example.com/example/img2_large.jpg',
	srcset: [
	  'http://example.com/example/img2_1024.jpg 1024w',
	  'http://example.com/example/img2_800.jpg 800w',
	  'http://example.com/example/img2_500.jpg 500w',
	  'http://example.com/example/img2_320.jpg 320w',
	]
    }
  }
];

```

### Photo properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. The src value of the gallery image
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Required. Height of the gallery image
aspectRatio | number | undefined | Required. Aspect ratio of the gallery image (width / height)
lightboxImage | object | undefined | Required.  Accepts 'src' and 'srcset' values of the lightbox image. See below

### lightboxImage property properties
Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. Image used for the lightbox
srcset     |       array    |       undefined    |       Optional.  Array of images for the lightbox

See [React Images](https://github.com/jossmac/react-images) for details on lightbox 'images' prop.
