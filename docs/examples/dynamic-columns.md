# Dynamic Columns

Change the columns depending on the size of your container at breakpoints of your choosing. Here I am using [react-measure](https://github.com/souporserious/react-measure) to achieve this.  

```js
render() {
  const width = this.state.width;
  return (
    <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width  })}>
    {
      ({ measureRef  }) => {
        if (width < 1 ){
          return <div ref={measureRef}></div>;
        }
        let columns = 1;
        if (width >= 480){
          columns = 2;
        }
        if (width >= 1024){
          columns = 3;
        }
        if (width >= 1824){
          columns = 4;
        }
        return <div ref={measureRef} className="App">
          <Gallery photos={this.state.photos} columns={columns}
        </div>
      }
    }
    </Measure>
  );
}

```

You can run the [local app](../examples/local-app.md) to see this in action.

