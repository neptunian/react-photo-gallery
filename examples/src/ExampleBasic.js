import React from 'react';
import Gallery from 'react-photo-gallery';

const ExampleBasic = ({photos, title, direction}) => {
    return (
      <div>
        <h2>{title}</h2>
        <Gallery photos={photos} direction={direction}/>
      </div>
    );
}

export default ExampleBasic;
