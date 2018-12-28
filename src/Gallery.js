import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo';
import { computeSizes, computeSizesColumns } from './utils';

class Gallery extends React.Component {
  state = {
    containerWidth: 0,
  };
  componentDidMount() {
    this.animationFrameID = null;
    this.observer = new ResizeObserver(entries => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (this.state.containerWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        this.animationFrameID = window.requestAnimationFrame(() => {
          this.setState({ containerWidth: Math.floor(newWidth) });
        });
      }
    });
    this.observer.observe(this._gallery);
  }
  componentWillUnmount() {
    this.observer.disconnect();
    window.cancelAnimationFrame(this.animationFrameID);
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
    const containerWidth = this.state.containerWidth;
    // no containerWidth until after first render with refs, skip calculations and render nothing
    if (!containerWidth) return <div ref={c => (this._gallery = c)}>&nbsp;</div>;
    const { ImageComponent = Photo } = this.props;
    // subtract 1 pixel because the browser may round up a pixel
    const { margin, onClick, direction } = this.props;
    let { columns } = this.props;

    // set default breakpoints if user doesn't specify columns prop
    if (columns === undefined) {
      columns = 1;
      if (containerWidth >= 500) columns = 2;
      if (containerWidth >= 900) columns = 3;
      if (containerWidth >= 1500) columns = 4;
    }
    const photos = this.props.photos;
    const width = containerWidth - 1;
    let galleryStyle, thumbs;

    if (direction === 'row') {
      galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
      thumbs = computeSizes({ width, columns, margin, photos });
    }
    if (direction === 'column') {
      galleryStyle = { position: 'relative' };
      thumbs = computeSizesColumns({ width, columns, margin, photos });
      galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
    }

    let ImageContainer = this.props.ContainerComponent || 'div';

    return (
      <div className="react-photo-gallery--gallery">
        <ImageContainer ref={c => (this._gallery = c)} style={galleryStyle}>
          {thumbs.map((photo, index) => {
            const { left, top, containerHeight, ...rest } = photo;
            return (
              <ImageComponent
                key={photo.key || photo.src}
                margin={margin}
                index={index}
                photo={rest}
                direction={direction}
                left={left}
                top={top}
                onClick={onClick ? this.handleClick : null}
              />
            );
          })}
        </ImageContainer>
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  columns: PropTypes.number,
  margin: PropTypes.number,
  ImageComponent: PropTypes.func,
};

Gallery.defaultProps = {
  margin: 2,
  direction: 'row',
};

export default Gallery;
