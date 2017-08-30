import React from 'react';

const style = `
  .thumb {
    overflow: hidden;
    position: relative;
  }

  .thumb > .img {
    position: absolute;
    background-size: cover;
    height: 100%;
    width: 100%;
    transition: transform .5s;
    transform: scale(1,1);
    z-index: -1;
  }

  .thumb:hover .img {
    transform: scale(1.25,1.25);
  }
 `;

const CustomImage = ({ index, photo, photo: { height, width, src }, onClick }) => (
  <div className="thumb" style={{ height, width }} onClick={() => onClick({ index, photo })}>
    <div className="img" style={{ backgroundImage: `url(${src})` }} />

    <style>{style}</style>
  </div>
);

export default CustomImage;
