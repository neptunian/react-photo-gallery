import React from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

const styles = {
  gallery: { width: '100%' },
  cell: { display: 'inline-block' },
};

class Gallery extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ index }) {
    const { photos, onClick } = this.props;
    if (typeof onClick !== 'function') {
      return;
    }

    onClick({
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  }

  render() {
    const { ImageComponent = Photo, measureRef } = this.props;
    const { photos, columns, padding, contentRect: { bounds: { width } } } = this.props;
    const thumbs = computeSizes({ width, columns, padding, photos });

    return (
      <div style={styles.gallery} ref={measureRef}>
        {thumbs.map((photo, index) => {
          const { width, height } = photo;

          return (
            <div key={photo.key || photo.src} style={{ ...styles.cell, width, height, margin: padding / 2 }}>
              <ImageComponent index={index} photo={photo} onClick={this.handleClick} />
            </div>
          );
        })}
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  padding: PropTypes.number,
  ImageComponent: PropTypes.any,
};

Gallery.defaultProps = {
  columns: 3,
  padding: 10,
};

const EnhancedGallery = withContentRect('bounds')(Gallery);
export default EnhancedGallery;
