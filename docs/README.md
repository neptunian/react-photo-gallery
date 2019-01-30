---
description: A repsonsive image gallery component for React
---

# React Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/react-photo-gallery.svg)](https://badge.fury.io/js/react-photo-gallery)
[![Build Status](https://travis-ci.org/neptunian/react-photo-gallery.svg?branch=master)](https://travis-ci.org/neptunian/react-photo-gallery)
[![Coverage Status](https://coveralls.io/repos/github/neptunian/react-photo-gallery/badge.svg?branch=master)](https://coveralls.io/github/neptunian/react-photo-gallery?branch=master)
[![Dependency Status](https://david-dm.org/neptunian/react-photo-gallery.svg)](https://david-dm.org/neptunian/react-photo-gallery)

* Responsive, accessible, composable, and customizable image gallery component 
* Maintains the original aspect ratio of your photos
* Creates a "masonry" style layout
* Uses actual image elements, optionally pass in srcSet and sizes attributes
* Supports row or column direction layout
* Supports passing in a custom image component for implementation of things like image selection, favorites, captions, or whatever your little heart desires!
* SSR app compatible

## Preview
<img src="https://c1.staticflickr.com/5/4914/46923523161_5e729d8313_h.jpg" />

## Installation

To install:

```
yarn add react-photo-gallery
```

## Documentation and Examples

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

## Direct CodeSandbox Links with Examples and Use Cases

* [Basic Row Layout](https://codesandbox.io/s/9yx911wl9y)
* [Basic Column Layout](https://codesandbox.io/s/r09k1xj614)
* [With Lightbox](https://codesandbox.io/s/5vn3lvz2n4)
* [Custom Dynamic Columns](https://codesandbox.io/s/ll7ym48027)
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

const photos = [
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

<Gallery photos={photos} />;

```

### Gallery properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | required; array of objects
columns | number or function  | undefined  | optional; number of photos per row or a function which receives the container width and should return the desired number of photos per row; defaults to Gallery's breakpoint choosing
onClick | function  | undefined  | optional; do something when the user clicks a photo; receives arguments event and an object containing the index, photo obj originally sent and the next and previous photos in the gallery if they exist
margin | number  | 2  | optional; number of margin pixels around each entire image
direction | string | 'row' | optional; `column` or `row` based layout
ImageComponent | function | default component | optional; use a different image component than the default provided to display your photo

### Photos array item properties (passed into Gallery's photos property)

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       required; the img src attribute value of the image
srcSet     |       array or string    |       undefined    |       optional; srcSet attribute of the image
sizes     |       array or string    |       undefined    |       optional; sizes attribute of the image
width | number  | undefined  | required; original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image
key  | string  | src | optional; key to be used on component

### ImageComponent props

If you're passing a function component to ImageComponent you will receive back these props:


Property        |       Type            |       Value
:-----------------------|:--------------|:--------------
margin     |       string    | optional; margin prop optionally passed into Gallery by user
index  | number  | required; the index of the photo within the Gallery
photo  | object  | required; the individual object passed into Gallery's `photos` array prop, with all the same props except recalculated height and width
direction  | string  | optional; direction passed into Gallery
top  | number  | required if direction is 'column'; top position of this image, only passed if direction prop was 'column'
left  | number  | required if direction is 'column'; left position of this image, only passed if direction prop was 'column'
onClick  | function  | optional; the onClick function optionally passsed into Gallery by user
