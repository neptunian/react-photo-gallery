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

## How It Works

This gallery utilizes a graph to calculate the best single layout where each possible photo to break on is a node and each row is an edge with a weight of the cost it would be to break at that photo and the shortest path is the final layout.  Inspired by [this blog article](http://blog.vjeux.com/2014/image/google-plus-layout-find-best-breaks.html) and this [Google Photos blog article](https://medium.com/google-design/google-photos-45b714dfbed).

## Installation

To install:

```
yarn add react-photo-gallery
```

## Documentation and Examples

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

## CodeSandbox Demos with Example Use Cases

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

