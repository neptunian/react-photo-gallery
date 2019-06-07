import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { debounce } from "./utils";

function ExampleDynamicLoading({ photos }) {
  const [images, setImages] = useState(photos.slice(0, 6));
  const [pageNum, setPageNum] = useState(1);
  const [loadedAll, setLoadedAll] = useState(false);
  const TOTAL_PAGES = 3;
  const loadMorePhotos = debounce(() => {
    if (pageNum > TOTAL_PAGES) {
      setLoadedAll(true);
      return;
    }

    setImages(images.concat(photos.slice(images.length, images.length + 6)));
    setPageNum(pageNum + 1);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    let scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      loadMorePhotos();
    }
  };

  return (
    <div>
      <h2>Loading Photos Dynamically in Column Layout</h2>
      <Gallery photos={images} direction={"column"} />
      {!loadedAll && (
        <div className="loading-msg" id="msg-loading-more">
          Loading
        </div>
      )}
    </div>
  );
}

export default ExampleDynamicLoading;
