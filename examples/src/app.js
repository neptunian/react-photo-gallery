import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import $ from 'jquery';
import _ from 'lodash';

class App extends React.Component{
    constructor(){
	super();
        this.state = {photos:null, pageNum:1, totalPages:1, loadedAll: false};

	this.handleScroll = this.handleScroll.bind(this);
	this.loadMorePhotos = this.loadMorePhotos.bind(this);
    }
    componentDidMount() {
        this.loadMorePhotos();
        this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(){
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) {
            this.loadMorePhotos();
        }
    }
    loadMorePhotos(e){
        if (e){
            e.preventDefault();
        }
	if (this.state.pageNum > this.state.totalPages){
	    this.setState({loadedAll: true});
	    return;
	}
        $.ajax({
          url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=372ef3a005d9b9df062b8240c326254d&photoset_id=72157631971715898&user_id=57933175@N08&format=json&per_page=21&page='+this.state.pageNum+'&extras=url_o,url_m,url_l,url_c',
          dataType: 'jsonp',
          jsonpCallback: 'jsonFlickrApi',
          cache: false,
          success: function(data) {
            let photos = data.photoset.photo.map(function(obj,i){
                let aspectRatio = parseFloat(obj.width_o / obj.height_o);
                return {
                    src: (aspectRatio >= 3) ? obj.url_c : obj.url_m,
                    srcset: [
                      obj.url_m + ' ' + obj.width_m + 'w',
                      obj.url_c + ' ' + obj.width_c + 'w',
                      obj.url_l + ' ' + obj.width_l + 'w'
                    ],
                    width: parseInt(obj.width_o),
                    height: parseInt(obj.height_o),
                    aspectRatio: aspectRatio,
                    lightboxImage:{src: obj.url_l, caption: obj.title}
                };
            });
	    this.setState({
		photos: this.state.photos ? this.state.photos.concat(photos) : photos,
		pageNum: this.state.pageNum + 1,
		totalPages: data.photoset.pages
	    });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(status, err.toString());
          }.bind(this)
        });
    }
    renderGallery(){
	return(
	    <Gallery photos={this.state.photos} />
	);
    }
    render(){
	// no loading sign if its all loaded
        if (this.state.photos && this.state.loadedAll){
            return(
		<div className="App">
		    {this.renderGallery()}
		</div>
            );
        }
	else if (this.state.photos){
	    return(
		<div className="App">
		    {this.renderGallery()}
			<div className="loading-msg" id="msg-loading-more">Loading</div>
		</div>
	    );
	}
        else{
            return(
		<div className="App">
			<div id="msg-app-loading" className="loading-msg">Loading</div>
		</div>
            );
        }
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
