# srcSet and sizes

It's recommended that you always make use of native image attributes `srcSet` and `sizes`. Pass these as as an array of the same name to each object in the `photos` property. [See example](../examples/srcset-and-sizes.md). If used correctly, combined, they will ensure that no unnecessarily large and heavy images will be served to the user, hopefully saving the user time and your server bandwidth.

```
<img src="small.jpg"
     srcset="large.jpg 1024w,
             medium.jpg 640w,
             small.jpg 320w"
     sizes="(min-width: 480px) 50vw,
            (min-width: 1024px) 33.3vw,
            100vw"
     alt="A forest" />
```

`srcSet` is a comma separated list of images. The first part consisting of the file path and name \(like src\) followed by a space and a width descriptor which is simply the actual width of your image followed by 'w'.

`sizes`** **is a comma separated list of media queries. The first part consists of the media query followed by a space and then a length. Here I chose to use 'vw' describing the width of the image relative to the viewport \(viewport width\). So for example if the viewport is only 480px wide this is saying that the image will be about 50% of the width of the viewport. This is because, though not shown in this example, I plan to have a full width gallery with only two columns if the browser width is &gt; 480px and &lt; 1024px. The browser then does some math, looks at its list of images in the `srcSet` attribute, and chooses the appropriate image to make a call to the server for.

[Any length](https://www.w3.org/TR/css3-values/#lengths) is valid here and you can use the calc\(\) method to help find your length. Here is an example of a 3 column layout adjusting for a 12em sidebar:

```
sizes="(min-width: 36em) calc(.333 * (100vw - 12em)),
100vw"
```

The last item in the list, in this example `100vw`, is the default size.

The breakpoints in `sizes` should mirror your site's breakpoints and take into account the possibility of you changing the`Gallery`'s `columns` property to make use of dynamic column sizes based on the screen width. This is something you have control over, and will need to take into consideration. [See the "Dynamic Columns" example.](../examples/dynamic-columns.md)
