# Gallery properties

See the Typescript def file (index.d.ts) for more detailed information until I update this. 

Property        |       Type            |       Default         |       Description
:-----------------------|:--------------|:--------------|:--------------------------------
photos | array  | undefined  | An array of Photos objects.  See below.
columns | number or function  | undefined  | Optional. The number of columns in a column layout (direction=column). Will use Gallery's breakpoint choosing if undefined.
targetRowHeight | number or (containerWidth) => number  | undefined  | Optional.  The algorithm will do its best to have rows close to this value. The smaller the number, the shorter the row, the more photos will be in a row.
limitNodeSearch | number or (containerWidth) => number  | undefined  | Optional. Ignored if `direction=column`.  Limit how many neighboring nodes to search for when visiting a node to find the best node or photo to break on. The Gallery decides this for you by default, using an algorithm that determines the probably average photo per row by looking at `targetRowHeight` and `containerWidth` and then adding 8. If it isn't limited the gallery would take too long to calculate and it would be looking at nodes that it would not make sense to break on, making unnecessary calculations.  For example if we are currently visiting photo #2 we do not need to check if photo #200 is a good place to break because it is likely we will never have that many photos in a row.  The smaller the number, the faster your gallery will calculate. Images per row cannot exceed this amount, so its one way of limiting that, but then it will not be able to search ahead for better fits. Use `targetRowHeight` as a way of adjusting the amount of photos if you want more/less photos per row. If you find your graph is slow, you can make this number smaller. If you pass in a function you will receive the `containerWidth` as a parameter. If your `containerWidth` is small and you only want 1 or 2 photos per row, it makes sense to make this number smaller at these breakpoints to speed things up. It is recommended you use the default setting unless you understand its usage.
onClick | function  | undefined  | Optional. Do something when the user clicks a photo.  Receives arguments event and an object containing the index, Photos obj originally sent and the next and previous photos in the gallery if they exist
margin | number  | 2  | optional; number of margin pixels around each entire image
direction | string | 'row' | optional; `column` or `row` based layout
renderImage | function | default component | optional; use a different image component than the default provided to display your photo
setComponentWidth | string or boolean | '100%' | Optional. This allows for the following customizations: <ul><li>`(no prop explicitly set)` or `setComponentWidth={true}`: set the container width to the component default (`100%`).</li><li>`setComponentWidth='80%'` or `setComponentWidth='768px'` or any valid CSS width value: set the container width to the specified value.</li><li>`setComponentWidth={false}`: do not set any width on the component container - this allows the consuming code to manage this itself.</li></ul>

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
onClick  | function  | optional; the onClick function optionally passed into Gallery by user
