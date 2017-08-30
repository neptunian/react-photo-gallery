import React from 'react';
import PropTypes from 'prop-types';

function DefaultImage({idx, onClick, margin, photo}){
	const {src, srcset, sizes, height, width, alt} = photo;
	style.margin = margin;
	return (
		<div style={style}> 
			<a href="#" onClick={(e) => onClick(e, idx, photo)}>
				<img src={src} srcSet={srcset} sizes={sizes} style={imgStyle} height={height} width={width} alt={alt} />
			</a>
		</div>
	);
}
const style = {
	display: 'block',
	backgroundColor:'#e3e3e3',
	float: 'left',
}
const imgStyle = {
	display: 'block',
	border: '0'
}

export default DefaultImage;
