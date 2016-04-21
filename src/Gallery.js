import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';

class Gallery extends React.Component{
    constructor(){
	super();
	this.state = {
	    currentImage: 0,
	    containerWidth: 0
	};
	this.handleResize = this.handleResize.bind(this);
	this.closeLightbox = this.closeLightbox.bind(this);
	this.gotoNext = this.gotoNext.bind(this);
	this.gotoPrevious = this.gotoPrevious.bind(this);
	this.openLightbox = this.openLightbox.bind(this);
    }
    componentDidMount(){
	this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)})
        window.addEventListener('resize', this.handleResize);
    }
    componentDidUpdate(){
	if (ReactDOM.findDOMNode(this).clientWidth !== this.state.containerWidth){
	    this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
	}
    }
    componentWillUnmount(){
	 window.removeEventListener('resize', this.handleResize, false);
    }
    handleResize(e){
        this.setState({containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
    }
    openLightbox(index, event){
        event.preventDefault();
        this.setState({
	    currentImage: index,
            lightboxIsOpen: true
        });
    }
    closeLightbox(){
        this.setState({
	    currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious(){
	this.setState({
	    currentImage: this.state.currentImage - 1,
	});
    }
    gotoNext(){
	this.setState({
	    currentImage: this.state.currentImage + 1,
	});
    }
    render(){
        var rowLimit = 1,
            photoPreviewNodes = [];
        if (this.state.containerWidth >= 480){
            rowLimit = 2;
        }
        if (this.state.containerWidth >= 1024){
            rowLimit = 3;
        }
        var contWidth = this.state.containerWidth - (rowLimit * 4); /* 4px for margin around each image*/
        contWidth = Math.floor(contWidth - 2); // add some padding to prevent layout prob
	var lightboxImages = [];
        for (var i=0;i<this.props.photos.length;i+=rowLimit){
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspectRatio=0,
                totalAr=0,
                commonHeight = 0;
            for (var j=i; j<i+rowLimit; j++){
                if (j == this.props.photos.length){
                    break;
                }
		totalAr += this.props.photos[j].aspectRatio;
            }
            commonHeight = contWidth / totalAr;
            // run thru the same set of items again to give the common height
            for (var k=i; k<i+rowLimit; k++){
                if (k == this.props.photos.length){
                    break;
                }
		var src = this.props.photos[k].src;

		if (this.props.disableLightbox){
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" />
			 </div>
		    );
		}
		else{
		    lightboxImages.push(this.props.photos[k].lightboxImage);
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <a href="#" className={k} onClick={this.openLightbox.bind(this, k)}><img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" /></a>
			 </div>
		    );
		}
            }
        }
	return(
	    this.renderGallery(photoPreviewNodes, lightboxImages)
        );
    }
    renderGallery(photoPreviewNodes, lightboxImages){
	if (this.props.disableLightbox){
	    return(
		<div id="Gallery" className="clearfix">
		    {photoPreviewNodes}
		</div>
	    );
	}
	else{
	    return(
		<div id="Gallery" className="clearfix">
		    {photoPreviewNodes}
		    <Lightbox
			currentImage={this.state.currentImage}
			images={lightboxImages}
			isOpen={this.state.lightboxIsOpen}
			onClose={this.closeLightbox}
			onClickPrev={this.gotoPrevious}
			onClickNext={this.gotoNext}
			width={1600}
			showImageCount={this.props.lightboxShowImageCount}
		    />
		</div>
	    );
	}
    }
};
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: function(props, propName, componentName){
	var lightboxImageValidator = React.PropTypes.object;
	if (!props.disableLightbox){
	    lightboxImageValidator = React.PropTypes.object.isRequired;
	}
	return React.PropTypes.arrayOf(
	    React.PropTypes.shape({
		src: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		aspectRatio: React.PropTypes.number.isRequired,
		lightboxImage: lightboxImageValidator
	    })
	).isRequired.apply(this,arguments);
    },
    disableLightbox: React.PropTypes.bool
};
Gallery.defaultProps = {
    lightboxShowImageCount: false,
    disableLightbox: false
}
// Gallery image style
const style = {
   display: 'block',
   margin: 2,
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Gallery;
