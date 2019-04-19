# Gallery properties

See the Typescript def file (index.d.ts) for more detailed information until I update this. 

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | An array of Photos objects.  See below.
columns | number or function  | undefined  | Optional. The number of columns in a column layout (direction=column). Will use Gallery's breakpoint choosing if undefined.
targetRowHeight | number or (containerWidth) => number  | undefined  | Optional.  The algorithm will do its best to have rows close to this value. The smaller the number, the more photos will be in a row.
maxNodeSearch | number or (containerWidth) => number  | undefined  | Optional.  The algorithm decides this for you by default and changes on breakpoints. The purpose is to limit how many neighboring nodes to search for when visiting each note to find the best path or photo to break on.  The smaller the number, the faster your gallery will calculate.  Do not use large numbers as speed will slow down exponentially. Do not change unless you understand its usage.
onClick | function  | undefined  | Optional. Do something when the user clicks a photo.  Receives arguments event and an object containing the index, Photos obj originally sent and the next and previous photos in the gallery if they exist
margin | number  | 2  | optional; number of margin pixels around each entire image
direction | string | 'row' | optional; `column` or `row` based layout
renderImage | function | default component | optional; use a different image component than the default provided to display your photo

### Photos array item properties (passed into Gallery's photos property)

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
src     |       string    |       undefined    |       the img src attribute value of the image
srcSet     |       array or string    |       undefined    |       optional; srcSet attribute of the image
sizes     |       array or string    |       undefined    |       optional; sizes attribute of the image
width | number  | undefined  | required; width of the gallery image (only used for calculating aspect ratio)
height  | number  | undefined | required; height of the gallery image (only used for calculating aspect ratio)
alt  | string  | undefined | optional; alt text of the gallery image
key  | string  | src | optional; key to be used on component

### renderImage props

renderImage will be called with an object containing these props:

Property        |       Type            |       Value
:-----------------------|:--------------|:--------------
margin     |       string    | optional; margin prop optionally passed into Gallery by user
index  | number  | required; the index of the photo within the Gallery
photo  | object  | required; the individual object passed into Gallery's `photos` array prop, with all the same props except recalculated height and width
direction  | string  | optional; direction passed into Gallery
top  | number  | required if direction is 'column'; top position of this image, only passed if direction prop was 'column'
left  | number  | required if direction is 'column'; left position of this image, only passed if direction prop was 'column'
onClick  | function  | optional; the onClick function optionally passsed into Gallery by user
