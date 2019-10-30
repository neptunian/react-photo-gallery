import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';

function ExampleCustomComponentSelection({ photos }) {
  const [images, setImages] = useState(photos);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, containerHeight, photo, direction }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={'2px'}
        index={index}
        photo={photo}
        left={left}
        top={top}
        direction={direction}
      />
    ),
    [selectAll]
  );

  return (
    <div>
      <h2>Using the ImageComponent prop</h2>
      <h3>Pass in a custom image component to create any visual representation such as selection</h3>
      <p>
        <button onClick={toggleSelectAll}>toggle select all</button>
      </p>
      <Gallery photos={images} renderImage={imageRenderer} />
    </div>
  );
}

export default ExampleCustomComponentSelection;
