import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

class Gallery extends React.Component {
  state = {
    containerWidth: 0,
  };
  componentDidMount() {
   this.observer = new ResizeObserver(() => {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    });
   this.observer.observe(this._gallery);
  }
  componentWillUnmount() {
    this.observer.disconnect();
  }
  handleClick = (event, { index }) => {
    const { photos, onClick } = this.props;
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  };

  render() {
    const { ImageComponent = Photo } = this.props;
    // subtract 1 pixel because the browser may round up a pixel
    const width = this.state.containerWidth - 1;
    const { photos, columns, margin, onClick } = this.props;
    const thumbs = computeSizes({ width, columns, margin, photos });
    return (
      <div className="react-photo-gallery--gallery">
        <div ref={c => (this._gallery = c)} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {thumbs.map((photo, index) => {
            return (
              <ImageComponent
                key={photo.key || photo.src}
                margin={margin}
                index={index}
                photo={photo}
                onClick={onClick ? this.handleClick : null}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  ImageComponent: PropTypes.func,
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2,
};

export default Gallery;
