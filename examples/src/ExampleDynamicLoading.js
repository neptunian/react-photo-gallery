import React from 'react';
import Gallery from 'react-photo-gallery';

function debounce(func, wait, immediate) {
    let timeout;
  return function() {
        const context = this, args = arguments;
    let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          
    };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      
  };

};

class ExampleDynamicLoading extends React.Component {
  constructor(props){
    super(props);
    this.state = {photos: this.props.photos.slice(0,6), pageNum:1, totalPages:3, loadedAll: false};
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.loadMorePhotos = debounce(this.loadMorePhotos, 200);
  }
  componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll(){
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
            this.loadMorePhotos();
    }
      
  }
  loadMorePhotos(){
    if (this.state.pageNum > this.state.totalPages){
            this.setState({loadedAll: true});
            return;
    }
    this.setState({
      photos: this.state.photos.concat(this.props.photos.slice(this.state.photos.length,this.state.photos.length+6)), 
      pageNum: this.state.pageNum + 1
    });
  }
  render(){
    return (
      <div>
        <h2>Loading Photos Dynamically</h2>
        <Gallery photos={this.state.photos} columns={this.props.columns} clientWidth={this.props.clientWidth} />
        {!this.state.loadedAll && <div className="loading-msg" id="msg-loading-more">Loading</div>}
      </div>
    );
  }  
}

export default ExampleDynamicLoading;
