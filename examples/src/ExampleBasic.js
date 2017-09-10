import React from 'react';
import Gallery from 'react-photo-gallery';

const ExampleBasic = ({photos, columns}) => {
    return (
      <div>
        <h2>Basic:</h2>
        <Gallery photos={photos} columns={columns} />
      </div>
    );
}

export default ExampleBasic;
