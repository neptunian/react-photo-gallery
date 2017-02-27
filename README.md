# React Responsive Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A stateless responsive React photo gallery component. Add your own routing, Lightbox methods, and manage your own state. 

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
	    <Gallery photos={PHOTO_SET} cols={5} lightboxOptions=
		{{
		    images: LIGHTBOX_IMAGE_SET,
                    backdropClosesModal: true,
                    onClose: this.closeLightbox,
                    onClickPrev: this.gotoPrevious,
                    onClickNext: this.gotoNext,
                    currentImage: this.state.currentImage,
                    isOpen: this.state.lightboxIsOpen,
                    width: 1600
                }}
	    />
	);
    }
}
const LIGHTBOX_IMAGE_SET = [
  {
    caption: 'image 1',
    src: 'http://example.com/example/img1.jpg',
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
  },
  {
    caption: 'image 2',
    src: 'http://example.com/example/img2.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
  }
];
const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1_small.jpg',
    width: 681,
    height: 1024,
  },
  {
    src: 'http://example.com/example/img2_small.jpg',
    width: 600,
    height: 600,
  }
];

```

### Gallery properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | Required. Array of objects (photos)
cols | number  | 3  | optional.  Number of photos per row
disableLightbox | boolean  | false  | Optional
lightboxOptions | object | undefined | Required UNLESS disabledLightbox prop is true.  See below for details

### Photos properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. The src value of the gallery image
width | number  | undefined  | Required. Width of the gallery image
height  | number  | undefined | Required. Height of the gallery image

## lightboxOptions
This component uses [React Images](https://github.com/jossmac/react-images) for Lightbox functionality.  Please view the documentation there for how to populate the lightboxOptions prop.
