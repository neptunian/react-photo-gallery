import React from 'react';

const style = {
  display: 'block',
  backgroundColor: '#e3e3e3',
  float: 'left',
};

function DefaultImage(props) {
  const { idx, onClick, src, srcSet, sizes, height, width, alt, margin } = props;
  style.margin = margin;

  return (
    <div style={style}>
      <a href="#" onClick={e => onClick(idx, e)}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          style={{ display: 'block', border: 0 }}
          height={height}
          width={width}
          alt={alt}
        />
      </a>
    </div>
  );
}

export default DefaultImage;
