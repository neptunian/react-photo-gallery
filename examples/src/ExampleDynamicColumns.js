import React from 'react';
import Gallery from 'react-photo-gallery';

function columns(containerWidth) {
  return Math.round(containerWidth / 100);
}

const ExampleDynamicColumns = ({photos, title, direction}) => {
    return (
      <div>
        <h2>{title}</h2>
        <Gallery photos={photos} direction={direction} columns={columns} />
      </div>
    );
}

export default ExampleDynamicColumns;
