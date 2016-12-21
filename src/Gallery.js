import React from 'react';
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
        var remainder = this.props.photos.length % rowLimit;
        if (remainder) { // there are fewer than rowLimit photos in last row
          var lastRowWidth = Math.floor(this.state.containerWidth - (remainder * 4) - 2);
          var lastRowIndex = this.props.photos.length - remainder;
        }
	var lightboxImages = [];
  var numHidden = 0; // # of images hidden in preview

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
            if (i === lastRowIndex) {
              commonHeight = lastRowWidth / totalAr;
            } else {
              commonHeight = contWidth / totalAr;
            }
            // run thru the same set of items again to give the common height
            for (var k=i; k<i+rowLimit; k++){
                if (k == this.props.photos.length){
                    break;
                }
		var src = this.props.photos[k].src;

    // Check if image shows in preview
    var hiddenInPreview = this.props.photos[k].hiddenInPreview;

		if (this.props.disableLightbox){
		    photoPreviewNodes.push(
			 <div key={k} style={style}>
			    <img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" />
			 </div>
		    );
		}
		else{
		    lightboxImages.push(this.props.photos[k].lightboxImage);
        if (!hiddenInPreview && (this.props.limitPhotosInPreview == 0 || this.props.limitPhotosInPreview > photoPreviewNodes.length)){
  		    photoPreviewNodes.push(
  			 <div key={k} style={style}>
  			    <a href="#" className={k} onClick={this.openLightbox.bind(this, k)}><img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" /></a>
  			 </div>
  		    );
        } else {
          numHidden = numHidden + 1;
        }
		}
            }
        }
        if ( numHidden > 0 ) {
          const moreImagesStyle = [
            {
              backgroundColor: 'rgba(0, 0, 0, .4)',
              bottom: 0,
              color: '#fff',
              fontSize: '35px',
              fontWeight: 'normal',
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              border: 0,
              margin: 0,
              padding: 0,
            },
            {
              display: 'table',
              height: '100%',
              width: '100%',
              border: 0,
              margin: 0,
              padding: 0,
            },
            {
              display: 'table-cell',
              textAlign: 'center',
              verticalAlign: 'middle',
              border: 0,
              margin: 0,
              padding: 0,
            },
          ];

          var lastItem = photoPreviewNodes.pop();
          var lastStyle = {...style};
          lastStyle.position = 'relative';
          lastStyle.cursor = 'pointer';
          lastStyle.margin = 0;
          photoPreviewNodes.push(
            <div key={this.props.photos.length-1} onClick={this.openLightbox.bind(this, photoPreviewNodes.length+1)} style={lastStyle}>
              {lastItem}
              <div style={moreImagesStyle[0]}>
                <div style={moreImagesStyle[1]}>
                  <div style={moreImagesStyle[2]}>
                    +{numHidden}
                  </div>
                </div>
              </div>
            </div>
          );
        }
  return(
	    this.renderGallery(photoPreviewNodes, lightboxImages)
        );
    }
    renderGallery(photoPreviewNodes, lightboxImages){
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
		    <Lightbox
			currentImage={this.state.currentImage}
			images={lightboxImages}
			isOpen={this.state.lightboxIsOpen}
			onClose={this.closeLightbox}
			onClickPrev={this.gotoPrevious}
			onClickNext={this.gotoNext}
			width={1600}
			showImageCount={this.props.lightboxShowImageCount}
			backdropClosesModal={this.props.backdropClosesModal}
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
    disableLightbox: React.PropTypes.bool,
    limitPhotosInPreview: React.PropTypes.number,
};
Gallery.defaultProps = {
    lightboxShowImageCount: false,
    backdropClosesModal: true,
    disableLightbox: false,
    limitPhotosInPreview: 0,
}
// Gallery image style
const style = {
   display: 'block',
   margin: 2,
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Gallery;
