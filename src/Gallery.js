import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';

var Gallery = React.createClass({
    displayName: 'Gallery',
    propTypes:{
        photos: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                src: React.PropTypes.string.isRequired,
                width: React.PropTypes.number.isRequired,
                height: React.PropTypes.number.isRequired,
                aspectRatio: React.PropTypes.number.isRequired,
                lightboxImage: React.PropTypes.object.isRequired
            })
        ).isRequired,
    },
    getInitialState: function(){
        return {
	    currentImage: 0,
	    containerWidth: 0
	}
    },
    componentDidMount: function(){
	// add 15 pixels bc for unknown reason the clientWidth here is larger than what it really is
	this.setState({containerWidth: ReactDOM.findDOMNode(this).clientWidth - 15})
        window.addEventListener('resize', this.handleResize);
    },
    handleResize: function(e){
        this.setState({containerWidth: ReactDOM.findDOMNode(this).clientWidth});
    },
    openLightbox (index, event) {
        event.preventDefault();
        this.setState({
	    currentImage: index,
            lightboxIsOpen: true
        });
    },
    closeLightbox () {
        this.setState({
	    currentImage: 0,
            lightboxIsOpen: false,
        });
    },
    gotoPrevious () {
	this.setState({
	    currentImage: this.state.currentImage - 1,
	});
    },
    gotoNext () {
	this.setState({
	    currentImage: this.state.currentImage + 1,
	});
    },
    render: function(){
        var rowLimit = 1,
            photoPreviewNodes = [];
        if (this.state.containerWidth >= 480){
            rowLimit = 2;
        }
        if (this.state.containerWidth >= 1024){
            rowLimit = 3;
        }
        var contWidth = this.state.containerWidth - (rowLimit * 4); /* 4px for margin around each image*/
        contWidth = Math.ceil(contWidth - 2); // subtract a couple pixels for unknown issue where line breaks in certain breakpoints.  this gives container some "padding"
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
		lightboxImages.push(this.props.photos[k].lightboxImage);
		var src = this.props.photos[k].src;
                photoPreviewNodes.push(
                     <div key={k} style={style}>
                        <a href="#" className={k} onClick={this.openLightbox.bind(this, k)}><img src={src} style={{display:'block', border:0}} height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio} alt="" /></a>
                     </div>
                );
            }
        }
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
                    height={1600}
                    styles={this.props.lightboxStyles}
                />
            </div>
        );
    }
});
// Gallery image style
const style = {
   display: 'block',
   margin: 2,
   backgroundColor:'#e3e3e3',
   float: 'left'
}

module.exports = Gallery;
