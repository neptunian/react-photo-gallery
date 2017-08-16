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
        const cols = this.props.cols;
        const remainder = this.props.photos.length % cols;
		const contWidth = Math.floor(this.state.containerWidth - (cols * (this.props.margin * 2))); 
		let photoPreviewNodes = [];
		let lastRowWidth;
		let lastRowIndex;

        if (remainder) { // there are fewer photos than cols num in last row
          lastRowWidth = Math.floor( ((this.state.containerWidth / cols) * remainder) - (remainder * (this.props.margin * 2)) );
          lastRowIndex = this.props.photos.length - remainder;
        }

        // loop thru each set of  cols num
        // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
        for (let i = 0; i<this.props.photos.length; i+= cols){
            let totalAr = 0;
            let commonHeight = 0;

	    	// get the total aspect ratio of the row
            for (var j=i; j<i+cols; j++){
                if (j == this.props.photos.length){
                    break;
                }
				this.props.photos[j].aspectRatio = this.props.photos[j].width / this.props.photos[j].height;	
				totalAr += this.props.photos[j].aspectRatio;
            }
            if (i === lastRowIndex) {
              commonHeight = lastRowWidth / totalAr;
            } else {
              commonHeight = contWidth / totalAr;
            }
            // run thru the same set of items again to give the width and common height
            for (let k=i; k<i+cols; k++){
                if (k == this.props.photos.length){
                    break;
                }

				let src = this.props.photos[k].src, srcset, sizes;
				if (this.props.photos[k].srcset){
		    		srcset = this.props.photos[k].srcset.join();
				}
				if (this.props.photos[k].sizes){
		    		sizes = this.props.photos[k].sizes.join();
				}

				style.margin = this.props.margin;
				photoPreviewNodes.push(
		    		<div key={k} style={style}>
						<a href="#" className={k} onClick={(e) => this.props.onClickPhoto(k, e)}>
			    			<img src={src} srcSet={srcset} sizes={sizes} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt={this.props.photos[k].alt} />
						</a>
		    		</div>
				);
            }
        }
		return(
	    	this.renderGallery(photoPreviewNodes)
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
    onClickPhoto: function(k,e){
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
