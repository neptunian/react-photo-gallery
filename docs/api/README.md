## Gallery properties

Property | Type | Default | Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array | undefined | required; array of objects
columns | number | 3 | optional; number of photos per row
onClick | function | undefined | optional; do something when the user clicks a photo; receives arguments event and an object containing the index, photo obj originally sent and the next and previous photos in the gallery if they exist 
margin | number | 2 | optional; number of margin pixels around each entire image

### Photos array item properties (passed into Gallery's photos property)

Property | Type | Default | Description
:-----------------------|:--------------|:--------------|:--------------------------------
src | string | undefined | required; the img src attribute value of the gallery image
srcSet | string | undefined | optional; the img srcSet attribute value of the gallery image
sizes | string | undefined | optional; the img sizes attribute value of the gallery image
width | number | undefined | required; original width of the gallery image (only used for calculating aspect ratio)
height | number | undefined | required; original height of the gallery image (only used for calculating aspect ratio)
alt | string | undefined | optional; alt text of the gallery image
ImageComponent | function | default component | optional; use a different image component than the default provided

