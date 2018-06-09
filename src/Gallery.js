import React from 'react';
import PropTypes from 'prop-types';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);

    let that = this;
    // this is to fix non-ios browsers where a scrollbar isnt present before
    // images load, then becomes present, and doesn't trigger an update.
    // avoids calling setState in componentDidUpdate causing maximum depth exceeded error
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(function() {
        if (that._gallery.clientWidth !== that.state.containerWidth) {
          that.setState({ containerWidth: Math.floor(that._gallery.clientWidth) });
        }
      });
    }
  }
  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  handleResize(e) {
    if (this._gallery.clientWidth !== this.state.containerWidth) {
      this.setState({ containerWidth: Math.floor(this._gallery.clientWidth) });
    }
  }
  handleClick(event, { index }) {
    const { photos, onClick } = this.props;
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  }

  render() {
    const { ImageComponent = Photo } = this.props;
    // subtract 1 pixel because the browser may round up a pixel
    const width = this.state.containerWidth - 1;
    const { photos, columns, margin, onClick } = this.props;
    const thumbs = computeSizes({ width, columns, margin, photos });
    return (
      <div className="react-photo-gallery--gallery">
        <div ref={c => (this._gallery = c)}>
          {thumbs.map((photo, index) => {
            const { width, height } = photo;
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
        <div style={{ content: '', display: 'table', clear: 'both' }} />
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
