import React from 'react';
import PropTypes from 'prop-types';

class Gallery extends React.Component{
    constructor(){
		super();
		this.state = {
	    	containerWidth: 0
		};
		this.handleResize = this.handleResize.bind(this);
    }
    componentDidMount(){
		this.setState({containerWidth: Math.floor(this._gallery.clientWidth)})
        window.addEventListener('resize', this.handleResize);
    }
	componentDidUpdate(){
		if (this._gallery.clientWidth !== this.state.containerWidth){
	    	this.setState({containerWidth: Math.floor(this._gallery.clientWidth)});
		}
    }
    componentWillUnmount(){
		window.removeEventListener('resize', this.handleResize, false);
    }
    handleResize(e){
        this.setState({containerWidth: Math.floor(this._gallery.clientWidth)});
    }
    render(){
		const {
			cols,
			margin,
			photos,
			onClickPhoto
		} = this.props;

		const containerWidth = this.state.containerWidth;

        const remainder = photos.length % cols;

		// calculate the available space for the images by subtracting the margin space from the actual parent container width
		// the 2 is for each side of the image
		const containerSpace = Math.floor(containerWidth - (cols * (margin * 2))); 
		let imgNodes = [];
		let lastRowWidth;
		let lastRowIndex;

        if (remainder) { // there are fewer photos than cols num in last row
          lastRowWidth = Math.floor( ((containerWidth / cols) * remainder) - (remainder * (margin * 2)) );
          lastRowIndex = photos.length - remainder;
        }

        // loop thru each set of cols num
        // eg. if cols is 3 it will loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
        for (let i = 0; i < photos.length; i+= cols){
            let totalAspectRatio = 0;
            let commonHeight = 0;

	    	// get the total aspect ratio of the row
            for (let j = i; j < i+cols; j++){
				const {
					width,
					height
				} = photos[j];

                if (j == photos.length){
                    break;
                }
				photos[j].aspectRatio = width / height;	
				totalAspectRatio += photos[j].aspectRatio;
            }
            if (i === lastRowIndex) {
              commonHeight = lastRowWidth / totalAspectRatio;
            } else {
              commonHeight = containerSpace / totalAspectRatio;
            }
            // run thru the same set of items again to give the width and common height
            for (let k=i; k<i+cols; k++){
                if (k == photos.length){
                    break;
                }

				// explicity set the exact width of the image instead of letting the browser calculate it based on the height of the image
				// because the browser may round up or down and cause the image to break to the next row if its even 1 pixel off
				const width = commonHeight * photos[k].aspectRatio; 

				const src = photos[k].src;
				const alt = photos[k].alt;
				let srcset;
				let sizes;

				if (photos[k].srcset){
		    		srcset = photos[k].srcset.join();
				}
				if (photos[k].sizes){
		    		sizes = photos[k].sizes.join();
				}
	
				style.margin = margin;

				imgNodes.push(
		    		<div key={k} style={style}>
						<a href="#" className={k} onClick={(e) => onClickPhoto(k, e)}>
			    			<img src={src} srcSet={srcset} sizes={sizes} style={{display:'block', border:0}} height={commonHeight} width={width} alt={alt} />
						</a>
		    		</div>
				);
            }
        }
		return(
	    	this.renderGallery(imgNodes)
        );
    }
    renderGallery(photoPreviewNodes){
		return(
	    	<div id="Gallery" className="clearfix" ref={(c) => this._gallery = c}>
				{photoPreviewNodes}
	    	</div>
		);
    }
};
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: function(props, propName, componentName){
		return PropTypes.arrayOf(
	    	PropTypes.shape({
				src: PropTypes.string.isRequired,
				width: PropTypes.number.isRequired,
				height: PropTypes.number.isRequired,
				alt: PropTypes.string,
				srcset: PropTypes.array,
				sizes: PropTypes.array
	    })
	).isRequired.apply(this,arguments);
    },
    onClickPhoto: PropTypes.func,
    cols: PropTypes.number,
    margin: PropTypes.number
};
Gallery.defaultProps = {
    cols: 3, 
    onClickPhoto: (k,e) => {
		e.preventDefault();
    },
    margin: 2
}
// Gallery image style
const style = {
   display: 'block',
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Gallery;
