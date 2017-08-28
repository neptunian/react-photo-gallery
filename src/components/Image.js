import React from 'react';
import PropTypes from 'prop-types';

function Image({idx, onClick, src, srcSet, sizes, height, width, alt, margin}){
	style.margin = margin;
	return (
		<div style={style}> 
			<a href="#" onClick={(e) => onClick(idx, e)}>
				<img src={src} srcSet={srcSet} sizes={sizes} style={{display:'block', border:0}} height={height} width={width} alt={alt} />
			</a>
		</div>
	);
}
const style = {
	display: 'block',
	backgroundColor:'#e3e3e3',
	float: 'left',
}


export default Image;
