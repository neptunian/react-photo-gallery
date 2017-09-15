# React Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* Stateless, responsive, and highly customizable
* Maintains the original aspect ratio of your photos
* Supports srcset and sizes
* Supports passing in a custom image component for implementation of things like image selection, favorites, captions, etc.

## Installation

To install:

```
npm install --save react-photo-gallery
```

## Examples

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
	    <Gallery photos={PHOTO_SET} onClick={this.openLightbox}/>
	);
    }
}
const PHOTO_SET = [
  {
    src: 'http://example.com/example/img1.jpg',
    srcset: [
      'http://example.com/example/img1_1024.jpg 1024w',
      'http://example.com/example/img1_800.jpg 800w',
      'http://example.com/example/img1_500.jpg 500w',
      'http://example.com/example/img1_320.jpg 320w',
    ],
    sizes:[
      '(min-width: 480px) 50vw',
      '(min-width: 1024px) 33.3vw',
      '100vw'
    ],
    width: 681,
    height: 1024,
    alt: 'image 1',
  },
  {
    src: 'http://example.com/example/img2.jpg',
    srcset: [
      'http://example.com/example/img2_1024.jpg 1024w',
      'http://example.com/example/img2_800.jpg 800w',
      'http://example.com/example/img2_500.jpg 500w',
      'http://example.com/example/img2_320.jpg 320w',
    ],
    sizes:[
      '(min-width: 480px) 50vw',
      '(min-width: 1024px) 33.3vw',
      '100vw'
    ],
    width: 600,
    height: 600,
    alt: 'image 2',
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

### Gallery.photos properties

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       required; the img src attribute value of the gallery image
srcset     |       string    |       undefined    |       optional; the img srcset attribute value of the gallery image
sizes     |       string    |       undefined    |       optional; the img sizes attribute value of the gallery image
width | number  | undefined  | required; original width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image
ImageComponent | function | default component | optional; use a different image component than the default provided

## User Guide / Best Practice

### Dynamic column count

The number of columns to display and when they change is something the user has control over in their app. The parameter `columns` allows the adjustment of the displayed colums. In combination with `react-measure` this allows the demo page to adjust colums. See the example app where [react-measure](https://github.com/souporserious/react-measure) is being used in combination with media queries to decide on the columns (https://github.com/neptunian/react-photo-gallery/blob/872c22fbdb9a656340297358416c74de4d27e96c/examples/src/app.js#L111).


### Passing in photos

Pass in an array of objects, each representing a photo,  with the necessary properties outlined in the table above.  Since the [Lightbox](https://github.com/jossmac/react-images) component being used in one of the demos needs a similar array, the same one is passed into it.

### Passing in a custom image component

Instead of using the default image component provided, you can pass in a custom one.  This would be useful if you want to change how the image looks and functions.  For example, having selection functionality where clicking on an image highlights it or adds a checkmark icon over it. 

app.js

```
<Gallery photos={this.state.photos} columns={this.props.columns} onClick={this.selectPhoto} ImageComponent={SelectedImage}/>
```

The custom component will be receive the following properties as seen from SelectedImage.js in the examples directory where `photo` is the original photo object passed in:

```
const SelectedImage = ({ index, onClick, photo, margin}) => {
  //calculate x,y scale
  const sx = (100 - ((30 / photo.width) * 100)) / 100;
  const sy = (100 - ((30 / photo.height) * 100)) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;
  return (<div style={{margin, width:photo.width, ...cont}}>
    <img style={photo.selected ? {...imgStyle, ...selectedImgStyle} : {...imgStyle}} {...photo} onClick={(e) => onClick(e, {index, photo})} />
    </div>
  )
};

export default SelectedImage; 
);
```
You can see this in action on the demo page.

## Other notes

To gain a good understanding of 'srcset' and 'sizes' attributes, I found this site very helpful: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).

