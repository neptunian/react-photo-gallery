import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';

import Photo, { photoPropType } from './Photo';
import { computeSizes } from './utils';

const styles = {
  gallery: { width: '100%' },
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
    const { photos, columns, margin, onClick } = this.props;
    const thumbs = computeSizes({ width, columns, margin, photos });
    return (
      <div>
      <div className="react-photo-gallery--gallery" style={styles.gallery} ref={c => (this._gallery = c)}>
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
        <div style={{content:"", display: "table", clear: "both"}}></div>
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  ImageComponent: PropTypes.any,
};

Gallery.defaultProps = {
  columns: 3,
  margin: 2,
};

export default Gallery;
