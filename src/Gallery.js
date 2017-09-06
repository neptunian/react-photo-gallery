import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

const styles = {
  gallery: { width: '100%' },
  cell: { display: 'block', float: 'left' },
};

class Gallery extends PureComponent {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const { photos, cols, padding, onClick } = this.props;
    const thumbs = computeSizes({ width, cols, padding, photos });

    return (
      <div style={styles.gallery} ref={c => (this._gallery = c)}>
        {thumbs.map((photo, index) => {
            const { width, height } = photo;
            return (
              <div key={photo.key || photo.src} style={{ ...styles.cell, width, height, margin: padding / 2 }}>
                <ImageComponent index={index} photo={photo} onClick={onClick ? this.handleClick : null} />
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
  cols: PropTypes.number,
  padding: PropTypes.number,
  ImageComponent: PropTypes.any,
};

Gallery.defaultProps = {
  cols: 3,
  padding: 4,
};

export default Gallery;
