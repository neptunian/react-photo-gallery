import React from 'react';
import PropTypes from 'prop-types';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

const Gallery = ({ clientWidth, photos, columns, margin, onClick, ImageComponent }) => {
  const handleClick = (event, { index }) => {
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  };

    ImageComponent = ImageComponent || Photo;
    // subtract 1 pixel because the browser may round up a pixel
    const width = clientWidth - 1;
    const thumbs = computeSizes({ width, columns, margin, photos });
    return (
      <div className="react-photo-gallery--gallery">
          {thumbs.map((photo, index) => {
            const { width, height } = photo;
            return (
              <ImageComponent
                key={photo.key || photo.src}
                margin={margin}
                index={index}
                photo={photo}
                onClick={onClick ? handleClick : null}
              />
            );
          })}
        <div style={{ content: '', display: 'table', clear: 'both' }} />
      </div>
    );
}

Gallery.propTypes = {
  clientWidth: PropTypes.number.isRequired,
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
