import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-photo-gallery';
import { withContentRect } from 'react-measure';
import Lightbox from 'react-images';
import jsonp from 'jsonp';

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { photos: null, pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0 };
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
  openLightbox(d, event) {
    this.setState({
      currentImage: d.index,
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
    if (this.state.photos.length - 2 === this.state.currentImage) {
      this.loadMorePhotos();
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  getColumnCount() {
    const { width } = this.props.contentRect.bounds;

    if (width >= 1824) {
      return 4;
    }

    if (width >= 1024) {
      return 3;
    }

    if (width >= 480) {
      return 2;
    }

    return 1;
  }

  render() {
    const { measureRef } = this.props;

    if (this.state.photos) {
      return (
        <div className="App" ref={measureRef}>
          <Gallery
            photos={this.state.photos}
            columns={this.getColumnCount()}
            onClick={this.openLightbox}
          />

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

const EnhancedApp = withContentRect('bounds')(App);

ReactDOM.render(<EnhancedApp />, document.getElementById('app'));
