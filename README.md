<a href="http://neptunian.github.io/react-photo-gallery/"><img src="https://sandygonzales.com/rpg-logo2.png" width="350" /></a>

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/react-photo-gallery.svg)](https://badge.fury.io/js/react-photo-gallery)
[![Build Status](https://travis-ci.org/neptunian/react-photo-gallery.svg?branch=master)](https://travis-ci.org/neptunian/react-photo-gallery)
[![Coverage Status](https://coveralls.io/repos/github/neptunian/react-photo-gallery/badge.svg?branch=master)](https://coveralls.io/github/neptunian/react-photo-gallery?branch=master)

* Stateless, responsive, accessible, and highly customizable
* Maintains the original aspect ratio of your photos
* Uses actual image elements, optionally pass in srcSet and sizes attributes
* Supports passing in a custom image component for implementation of things like image selection, favorites, captions, or whatever your little heart desires!

## Preview
<img src="https://c1.staticflickr.com/5/4512/36861861853_4fcabda911_b.jpg" />

## Installation

To install:

```
npm install --save react-photo-gallery
```

## Documentation and Examples

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

## Direct CodeSandbox Links with Examples and Use Cases

* [Basic](https://codesandbox.io/s/9yx911wl9y)
* [With Lightbox](https://codesandbox.io/s/5vn3lvz2n4)
* [Dynamic Columns](https://codesandbox.io/s/ll7ym48027)
* [Selection using custom ImageComponent](https://codesandbox.io/s/o7o241q09)
* [Sortable with drag and drop](https://codesandbox.io/s/8y7n1r9y5j)

To build some examples locally, run:

```
yarn install
yarn start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Use

```jsx

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
    src: 'http://example.com/example/img1.jpg',
    width: 4,
    height: 3
  },
  {
    src: 'http://example.com/example/img2.jpg',
    width: 1,
    height: 1
  }
];

```

### Gallery properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | required; array of objects
columns | number  | 3  | optional; number of photos per row
onClick | function  | undefined  | optional; do something when the user clicks a photo; receives arguments event and an object containing the index, photo obj originally sent and the next and previous photos in the gallery if they exist
margin | number  | 2  | optional; number of margin pixels around each entire image
ImageComponent | function | default component | optional; use a different image component than the default provided to display your photo

### Photos array item properties (passed into Gallery's photos property)

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       required; the img src attribute value of the image
srcSet     |       array    |       undefined    |       optional; array of strings for the srcSet attribute of the image
sizes     |       array    |       undefined    |       optional; array of strings for the sizes attribute of the image
width | number  | undefined  | required; original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image

