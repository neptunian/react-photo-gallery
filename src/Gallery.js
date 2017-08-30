import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    window.addEventListener('resize', this.handleResize);
  }
  componentDidUpdate() {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  handleResize(e) {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
  }
  aspectRatio({ width, height }) {
    return width / height;
  }
  scalePhotoDimensions() {
    const { cols, margin, photos } = this.props;
    // subtract 1 pixel because the browser may round up a pixel
    const containerWidth = this.state.containerWidth - 1;

    // divide photos in rows based on cols per row [[1,2,3],[4,5,6],[7,8]]]
    let rows = photos.reduce((acc, item, idx) => {
      const rowNum = Math.floor(idx / cols);
      acc[rowNum] = acc[rowNum] ? [...acc[rowNum], item] : [item];
      return acc;
    }, []);

    // scale the image dimensions
    rows = rows.map(row => {
      const totalAspectRatio = row.reduce((acc, photo, idx) => acc + this.aspectRatio(photo), 0);

      // calculate the width differently if its the last row and there are fewer photos left than col num
      const rowWidth =
        row.length < cols
          ? Math.floor(containerWidth / cols * row.length - row.length * (margin * 2))
          : Math.floor(containerWidth - row.length * (margin * 2));

      const rowHeight = rowWidth / totalAspectRatio;

      return row.map(photo => ({
        ...photo,
        width: rowHeight * this.aspectRatio(photo),
        height: rowHeight,
      }));
    });

    // flatten back the photos array
    const flatRows = rows.reduce((acc, row) => [...acc, ...row], []);
    console.log(flatRows);
    return flatRows;
  }
  render() {
    const resizedPhotos = this.scalePhotoDimensions();
    return (
      <div id="Gallery" style={{ width: '100%' }} className="clearfix" ref={c => (this._gallery = c)}>
        {resizedPhotos.map((photo, idx) => {
          let Image = photo.component ? photo.component : Photo;
          return (
            <Image
              key={idx}
              idx={idx}
              onClick={photo.onClickPhoto ? photo.onClickPhoto : this.props.onClickPhoto}
              src={photo.src}
              srcSet={photo.srcset.join()}
              sizes={photo.sizes.join()}
              height={photo.height}
              width={photo.width}
              alt={photo.alt}
              margin={this.props.margin}
            />
          );
        })}
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: function(props, propName, componentName) {
    return PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        alt: PropTypes.string,
        srcset: PropTypes.array,
        sizes: PropTypes.array,
        component: PropTypes.func,
        onClickPhoto: PropTypes.func,
      })
    ).isRequired.apply(this, arguments);
  },
  onClickPhoto: PropTypes.func,
  cols: PropTypes.number,
  margin: PropTypes.number,
};

Gallery.defaultProps = {
  cols: 3,
  onClickPhoto: (k, e) => {
    e.preventDefault();
  },
  margin: 2,
};

export default Gallery;
