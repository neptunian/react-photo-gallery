# React Responsive Photo Gallery

[![Join the chat at https://gitter.im/react-photo-gallery/Lobby](https://badges.gitter.im/react-photo-gallery/Lobby.svg)](https://gitter.im/react-photo-gallery/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A stateless responsive React photo gallery component that maintains the original aspect ratio of your photos and scales them responsively.
Add your own routing, lightbox, and manage your own state. 

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
	    <Gallery photos={PHOTO_SET} onClickPhoto={this.openLightbox}/>
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
cols | number  | 3  | optional; number of photos per row
onClickPhoto | function  | e.preventDefault()  | optional; do something when the user clicks a photo
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
component | function | default image component | optional; use a different image component than the default provided
onClickPhoto | function | default to Gallery onClickPhoto prop if exists | optional; specific callback for a photo that overrides Gallery's onClickPhoto

## User Guide / Best Practice

### Dynamic column count

The number of columns and when they change is something the user has control over in their app. The parameter `cols` allows the adjustment of the displayed colums. In combination with `react-measure` this allows the demo page to adjust colums (https://github.com/neptunian/react-photo-gallery/blob/master/examples/src/app.js#L103). Code snippet:

```
import { Measure } from 'react-measure';
function ResponsiveGallery (props) {
  const { maxImageWidth = 300 } = props;
  return (
    <Measure whitelist={['width']}>
      {({ width }) => (
        <Gallery cols={Math.ceil(width / maxImageWidth)}>....</Gallery>
      )}
    </Measure>
  );
}
```
This idea was discussed in #32 and proposed by @smeijer.

### Passing in photos

In the demo I chose to have one object of photos that I pass in to both the Gallery component and the Lightbox component to keep the code cleaner and stateless.  Stateless because I can keep the Lightbox outside of the Gallery component and the user can decide whether to use any Lightbox of their choosing or none at all. I added all the properties into this object that either component might need or that I wanted to use for customization.

### Passing in a custom image component

Instead of using the default image component provided, you can pass in a custom one.  This would be useful if you want to change how the image looks and functions in more ways than the API can provide.  Or if you want to use different image components depending on the state of a particular image. For example, having selection functionality where clicking on an image highlights it or adds a checkmark icon over it. The component will be passed back the following properties as seen from code in the Gallery.js:

```
let Image = (photo.component) ? photo.component : DefaultImage; 
return (
	<Image
		key={idx}
		idx={idx}
		onClick={this.props.onClickPhoto}
		src={photo.src}
		srcSet={photo.srcset.join()}
		sizes={photo.sizes.join()}
		height={photo.height}
		width={photo.width}
		alt={photo.alt}
		margin={this.props.margin}
	/>
);
```
## Other notes
This component uses [React Images](https://github.com/jossmac/react-images) for lightbox functionality in the example demo, but the component itself does not depend on it. 

To gain a good understanding of 'srcset' and 'sizes' attributes, I found this site very helpful: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).

