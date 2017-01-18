# React Responsive Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A responsive React photo gallery component.

## Installation

To install:

```
npm install --save react-photo-gallery
```

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

### Gallery properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | Required. Array of objects (photos)
disableLightbox | boolean  | false  | Optional
lightboxShowImageCount | boolean | false | Optional.  Displays at the bottom of the photo index of total images. Eg. "5 of 20"
backdropClosesModal | boolean | true | Optional. Clicking on backdrop closes the modal
preloadNextImage | boolean | true | Optional. Based on the direction the user is navigating, preload the next available image.

### Photos properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. The src value of the gallery image
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Required. Height of the gallery image
aspectRatio | number | undefined | Required. Aspect ratio of the gallery image (width / height)
lightboxImage | object | undefined | Required by default.  If disableLightbox is true, Optional. See below for prop details.

### lightboxImage prop properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. Image used for the lightbox
srcset     |       array    |       undefined    |       Optional.  Array of srcsets for the lightbox
caption     |       string    |       undefined    |       Optional.  Caption for the lightbox image

## Lightbox
This component uses [React Images](https://github.com/jossmac/react-images) for Lightbox functionality.  I've incorporated what I think to be useful Lightbox properties in context of a gallery into this component.
