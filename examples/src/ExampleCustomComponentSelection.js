import React from 'react';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';

class ExampleCustomComponentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: this.props.photos, selectAll: false };
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }
  selectPhoto(event, obj){
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({photos: photos});
  }
  toggleSelect(){
    let photos = this.state.photos.map((photo,index)=> { return {...photo, selected: !this.state.selectAll}});
    this.setState({photos: photos, selectAll: !this.state.selectAll});
  }
  render(){
    return (
      <div>
        <h2>Using the Custom Image Component:</h2>
        <h3>Pass in a custom image component to create any visual representation such as selection</h3>
        <button className="toggle-select" onClick={this.toggleSelect}>toggle select</button>
        <Gallery photos={this.state.photos} columns={this.props.columns} onClick={this.selectPhoto} ImageComponent={SelectedImage}/>
      </div>
    );
  }
}

export default ExampleCustomComponentSelection;
