import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import jsonp from 'jsonp';
import Measure from 'react-measure';
import { debounce } from './utils';

import CustomImage from './CustomImage';

class App extends React.Component {
  constructor() {
    super();
    this.state = { photos: null, pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0, width: -1 };
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  componentDidMount() {
    this.loadMorePhotos();
    this.loadMorePhotos = debounce(this.loadMorePhotos, 200);
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 50) {
      this.loadMorePhotos();
    }
  }
  loadMorePhotos(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.pageNum > this.state.totalPages) {
      this.setState({ loadedAll: true });
      return;
    }

    const urlParams = {
      api_key: '372ef3a005d9b9df062b8240c326254d',
      photoset_id: '72157680705961676',
      user_id: '57933175@N08',
      format: 'json',
      per_page: '21',
      page: this.state.pageNum,
      extras: 'url_m,url_c,url_l,url_h,url_o',
    };

    let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
    url = Object.keys(urlParams).reduce((acc, item) => {
      return acc + '&' + item + '=' + urlParams[item];
    }, url);

    jsonp(url, { name: 'jsonFlickrApi' }, (err, data) => {
      let photos = data.photoset.photo.map(item => {
        let aspectRatio = parseFloat(item.width_o / item.height_o);
        return {
          src: aspectRatio >= 3 ? item.url_c : item.url_m,
          width: parseInt(item.width_o),
          height: parseInt(item.height_o),
          title: item.title,
          alt: item.title,
          srcSet: [
            `${item.url_m} ${item.width_m}w`,
            `${item.url_c} ${item.width_c}w`,
            `${item.url_l} ${item.width_l}w`,
            `${item.url_h} ${item.width_h}w`,
          ],
          sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw'],
        };
      });
      this.setState({
        photos: this.state.photos ? this.state.photos.concat(photos) : photos,
        pageNum: this.state.pageNum + 1,
        totalPages: data.photoset.pages,
      });
    });
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    // load more photos if scrolling into the lightbox
    if (this.state.photos.length - 2 === this.state.currentImage) {
      this.loadMorePhotos();
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  renderGallery(){
    const width = this.state.width;
    return(
		<Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
			{
				({ measureRef }) => {
          // fix flash of one col and large image
          // don't try to load gallery until width is bigger
          if (width < 1 ){
            return <div ref={measureRef}></div>;
          }
					let columns = 1;
					if (width >= 480){
						columns = 2;
					}
					if (width >= 1024){
						columns = 3;
					}
					if (width >= 1824){
						columns = 4;
					}
					return <div ref={measureRef}>
                  <Gallery 
								    photos={this.state.photos}
								    columns={columns}
								    onClick={this.openLightbox}
								    //  ImageComponent={CustomImage}
							    />
                </div>
				}
			}
		</Measure>
	);
  }

  render() {
    if (this.state.photos) {
      return (
        <div className="App">
          {this.renderGallery()}
          <Lightbox
            theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
            images={this.state.photos.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            width={1600}
          />

          {!this.state.loadedAll && (
            <div className="loading-msg" id="msg-loading-more">
              Loading
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            Loading
          </div>
        </div>
      );
    }
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
