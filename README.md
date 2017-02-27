# React Responsive Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
A stateless responsive React photo gallery component. Add your own routing, lightbox, and manage your own state. 

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
	    <Gallery photos={PHOTO_SET} cols={5} onClickPhoto={this.openLightbox}/>
	);
    }
}
const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1_small.jpg',
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
    width: 681,
    height: 1024,
    caption: 'image 1',
  },
  {
    src: 'http://example.com/example/img2_small.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
    width: 600,
    height: 600,
    caption: 'image 2',
  }
];

```

### Gallery properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | Required. Array of objects (photos)
cols | number  | 3  | optional.  Number of photos per row
onClickPhoto | function  | undefined  | Optional. Do something when the user clicks a photo

### Gallery.photos properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       Required. The src value of the gallery image
width | number  | undefined  | Required. Original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | Required. Original height of the gallery image (only used for calculating aspect ratio)

## Demo explanation
This component uses [React Images](https://github.com/jossmac/react-images) for Lightbox functionality in the example demo. 
PHOTO_SET obj in the example above is also being passed to lightbox which uses src, srcset, and caption props.
