import React from 'react';
import Lightbox from 'react-images';

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
        var cols = this.props.cols,
            photoPreviewNodes = [];
	if (!this.props.cols){
	   cols = 3;    
	}
        var contWidth = this.state.containerWidth - (cols * 4); /* 4px for margin around each image*/
        contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
        var remainder = this.props.photos.length % cols;
        if (remainder) { // there are fewer than photos in last row
          var lastRowWidth = Math.floor(this.state.containerWidth - (remainder * 4) - 2);
          var lastRowIndex = this.props.photos.length - remainder;
        }
	//var lightboxImages = [];
        // loop thru each set of  cols num
        // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
        for (var i=0;i<this.props.photos.length;i+=cols){
            var totalAr=0,
            commonHeight = 0;

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
		var src = this.props.photos[k].src;
		if (!this.props.disableLightbox){
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <a href="#" className={k} onClick={(e) => this.props.openLightbox(k, e)}><img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" /></a>
			 </div>
		    );
		}
		else{
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" />
			 </div>
		    );
		}
            }
        }
	return(
	    this.renderGallery(photoPreviewNodes)
        );
    }
    renderGallery(photoPreviewNodes){
	if (this.props.disableLightbox){
	    return(
		<div id="Gallery" className="clearfix" ref={(c) => this._gallery = c}>
		    {photoPreviewNodes}
		</div>
	    );
	}
	else{
	    return(
		<div id="Gallery" className="clearfix" ref={(c) => this._gallery = c}>
		    {photoPreviewNodes}
		    <Lightbox {...this.props.lightboxOptions} />
		</div>
	    );
	}
    }
};
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: function(props, propName, componentName){
	return React.PropTypes.arrayOf(
	    React.PropTypes.shape({
		src: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
	    })
	).isRequired.apply(this,arguments);
    },
    lightboxOptions: function(props, propName, componentName){
	var lightboxOptionsValidator = React.PropTypes.object;
	if (!props.disableLightbox){
	    lightboxOptionsValidator = React.PropTypes.object.isRequired;
	}
	return lightboxOptionsValidator.apply(this, arguments);
    },
    disableLightbox: React.PropTypes.bool,
    cols: React.PropTypes.number
};
Gallery.defaultProps = {
    disableLightbox: false,
    cols: 3
}
// Gallery image style
const style = {
   display: 'block',
   margin: 2,
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Gallery;
