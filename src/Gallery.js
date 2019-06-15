import React, { useState, useLayoutEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo';
import { computeColumnLayout } from './layouts/columns';
import { computeRowLayout } from './layouts/justified';
import { findIdealNodeSearch } from './utils/findIdealNodeSearch';

function Gallery({ photos, onClick, direction, margin, limitNodeSearch, targetRowHeight, columns, renderImage }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [sizedPhotos, setSizedPhotos] = useState([]);

  const galleryEl = useRef(null);

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (containerWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        animationFrameID = window.requestAnimationFrame(() => {
          setContainerWidth(Math.floor(newWidth));
        });
      }
    });
    observer.observe(galleryEl.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  const handleClick = (event, { index }) => {
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  };

  // memoize layout calculations
  useMemo(
    () => {
      if (!containerWidth) return;
      if (direction === 'row') {
        // allow user to calculate limitNodeSearch from containerWidth
        if (typeof limitNodeSearch === 'function') {
          limitNodeSearch = limitNodeSearch(containerWidth);
        }
        if (typeof targetRowHeight === 'function') {
          targetRowHeight = targetRowHeight(containerWidth);
        }
        // set how many neighboring nodes the graph will visit
        if (limitNodeSearch === undefined) {
          limitNodeSearch = 1;
          if (containerWidth >= 450) {
            limitNodeSearch = findIdealNodeSearch({
              containerWidth,
              targetRowHeight,
            });
          }
        }
        setSizedPhotos(
          computeRowLayout({
            containerWidth: containerWidth - 1,
            limitNodeSearch,
            targetRowHeight,
            margin,
            photos,
          })
        );
      }
      if (direction === 'column') {
        // allow user to calculate columns from containerWidth
        if (typeof columns === 'function') {
          columns = columns(containerWidth);
        }
        // set default breakpoints if user doesn't specify columns prop
        if (columns === undefined) {
          columns = 1;
          if (containerWidth >= 500) columns = 2;
          if (containerWidth >= 900) columns = 3;
          if (containerWidth >= 1500) columns = 4;
        }
        setSizedPhotos(
          computeColumnLayout({
            containerWidth: containerWidth - 1,
            columns,
            margin,
            photos,
          })
        );
      }
    },
    [photos, direction, margin, limitNodeSearch, targetRowHeight, columns, renderImage, containerWidth]
  );

  // conditionally assign styles
  let galleryStyle = {};
  if (sizedPhotos.length) {
    if (direction === 'row') {
      galleryStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
      };
    } else {
      galleryStyle = { position: 'relative' };
      galleryStyle.height = sizedPhotos[sizedPhotos.length - 1].containerHeight;
    }
  }
  // get default or custom component
  const PhotoComponent = renderImage || Photo;
  return (
    <div className="react-photo-gallery--gallery">
      <div ref={galleryEl} style={galleryStyle}>
        {sizedPhotos.map((photo, index) => {
          const { left, top, key, containerHeight, ...rest } = photo;
          return (
            <PhotoComponent
              key={photo.key || photo.src}
              margin={margin}
              index={index}
              photo={rest}
              direction={direction}
              left={left}
              top={top}
              onClick={onClick ? handleClick : null}
            />
          );
        })}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  targetRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  limitNodeSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  margin: PropTypes.number,
  renderImage: PropTypes.func,
};

Gallery.defaultProps = {
  margin: 2,
  direction: 'row',
  targetRowHeight: 300,
};
export { Photo };
export default Gallery;
