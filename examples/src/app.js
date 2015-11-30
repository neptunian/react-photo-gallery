import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import $ from 'jquery';
import _ from 'lodash';

var App = React.createClass({
    getInitialState: function(){
        return {photos:null, pageNum:1};
    },
    componentDidMount: function() {
        this.loadMorePhotos();
        this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
        window.addEventListener('scroll', this.handleScroll);
    },
    handleScroll: function(e){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.loadMorePhotos();
        }
    },
    loadMorePhotos: function(e){
        if (e){
            e.preventDefault();
        }

        $.ajax({
          url: 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=&user_id=57933175@N08&format=json&per_page=21&page='+this.state.pageNum+'&extras=url_o,url_m,url_l',
          dataType: 'jsonp',
          jsonpCallback: 'jsonFlickrApi',
          cache: false,
          success: function(data) {
            let photos = data.photos.photo.map(function(obj,i){
                let ar = parseFloat(obj.width_o / obj.height_o);
                return {
                    gallery_src: obj.url_m,
                    src: obj.url_l,
                    width: obj.width_o,
                    height: obj.height_o,
                    ar: ar
                };
            });
	    this.setState({
		photos: this.state.photos ? this.state.photos.concat(photos) : photos,
		pageNum: this.state.pageNum + 1,
	    });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(status, err.toString());
          }.bind(this)
        });
    },
    render: function(){
        if (this.state.photos){
            return(
		<div className="App">
		    <div id="GalleryView" ref="galleryCont">
			<Gallery data={this.state.photos} />
			<div className="loading-msg" id="msg-loading-more">Loading</div>
		    </div>
		</div>
            );
        }
        else{
            return(
		<div className="App">
		    <div id="GalleryView" ref="galleryCont">
			<div id="msg-app-loading" className="loading-msg">Loading</div>
		    </div>
		</div>
            );
        }
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
