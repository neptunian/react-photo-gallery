<a href="http://neptunian.github.io/react-photo-gallery/"><img src="https://sandygonzales.com/rpg-logo2.png" width="350" /></a>

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* Stateless, responsive, accessible, and highly customizable
* Maintains the original aspect ratio of your photos
* Uses actual image elements, optionally pass in srcSet and sizes attributes
* Supports passing in a custom image component for implementation of things like image selection, favorites, captions, or whatever your little heart desires!

## Preview
<img src="https://c1.staticflickr.com/5/4512/36861861853_4fcabda911_b.jpg" />

## Documentation and Examples

[http://neptunian.github.io/react-photo-gallery/](http://neptunian.github.io/react-photo-gallery/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.

## Installation

To install:

```
npm install --save react-photo-gallery
```

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
    width: 1 
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

### Photos array item properties (passed into Gallery's photos property)

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       required; the img src attribute value of the image
srcSet     |       array    |       undefined    |       optional; array of strings for the srcSet attribute of the image
sizes     |       array    |       undefined    |       optional; array of strings for the sizes attribute of the image
width | number  | undefined  | required; original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image
ImageComponent | function | default component | optional; use a different image component than the default provided

