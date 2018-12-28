import React from 'react';
import Gallery from 'react-photo-gallery';
import FlipMove from 'react-flip-move';

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

class ExampleWithFlipMove extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: props.photos,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      var photos = [...this.state.photos];

      shuffle(photos);

      this.setState({ photos });
    }, 3000);
  };

  render() {
    return (
      <div>
        <h2>Using with a FlipMove component</h2>
        <Gallery photos={this.state.photos} onClick={this.openLightbox} ContainerComponent={FlipMove} />
      </div>
    );
  }
}

export default ExampleWithFlipMove;
