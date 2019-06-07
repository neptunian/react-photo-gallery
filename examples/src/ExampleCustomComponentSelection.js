import React, { useState } from "react";
import Gallery from "react-photo-gallery";
import renderSelectImage from "./SelectedImage";

function ExampleCustomComponentSelection({ photos }) {
  const [images, setImages] = useState(photos);
  const [selectAll, setSelectAll] = useState(false);

  const selectPhoto = (event, obj) => {
    let currImages = [...images];
    currImages[obj.index].selected = !currImages[obj.index].selected;
    setImages(currImages);
  };
  const toggleSelect = () => {
    let currImages = [...images].map(img => {
      return { ...img, selected: !selectAll };
    });
    setImages(currImages);
    setSelectAll(!selectAll);
  };
  return (
    <div>
      <h2>Using the ImageComponent prop</h2>
      <h3>
        Pass in a custom image component to create any visual representation
        such as selection
      </h3>
      <p>
        <button className="toggle-select" onClick={toggleSelect}>
          toggle select all
        </button>
      </p>
      <Gallery
        photos={images}
        onClick={selectPhoto}
        renderImage={renderSelectImage}
      />
    </div>
  );
}

export default ExampleCustomComponentSelection;
