# Custom Dynamic Columns

By default, the Gallery chooses the amount of columns per row, based on the width of itself. The default columns are:

```
columns = 1;
if (containerWidth >= 500) columns = 2;
if (containerWidth >= 900) columns = 3;
if (containerWidth >= 1500) columns = 4;
```

If you'd like to change the columns based on the container size of your choosing try using [react-measure](https://github.com/souporserious/react-measure) to measure the size of your container. Resize the browser to see this in action.  See example:

<iframe src="https://codesandbox.io/embed/ll7ym48027?hidenavigation=1&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


