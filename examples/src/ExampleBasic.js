import React from 'react';
import Gallery from 'react-photo-gallery';

const ExampleBasic = ({ photos, title, direction, onLoadCallback }) => {
    return (
      <div>
        <h2>{title}</h2>
        <Gallery photos={photos} direction={direction} onLoadCallback={onLoadCallback}/>
      </div>
    );
}

export default ExampleBasic;
