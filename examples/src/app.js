import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import $ from 'jquery';
import _ from 'lodash';

var App = React.createClass({
    getInitialState: function(){
        return {photos:null, pageNum:1, photosPerPage:21, containerWidth:0};
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
          dataType: 'jsonp',
          jsonpCallback: 'jsonFlickrApi',
          cache: false,
          success: function(data) {
            if (this.state.photos){ // if not null (not first load)
                this.setState({
                    photos: this.state.photos.concat(data.photos.photo),
                    pageNum: this.state.pageNum + 1,
                    containerWidth: React.findDOMNode(this).clientWidth
                });
            }
            else{
                this.setState({
                    photos: data.photos.photo,
                    pageNum: this.state.pageNum + 1,
                    containerWidth: React.findDOMNode(this).clientWidth
                });
            }
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
			<Gallery data={this.state.photos} pageNum={this.state.pageNum} photosPerPage={this.state.photosPerPage} containerWidth={this.state.containerWidth}/>
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
