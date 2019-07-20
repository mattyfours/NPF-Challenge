import React from 'react'
import '../../global.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAlignRight, faAlignLeft, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

import { ChromePicker } from 'react-color'

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString:'',
      imageOptions:[],
      posterOptions:{},
    };
  }
  componentDidMount() {
    this.setState({'posterOptions': this.props.posterOptions})
    this.getDefaultImages();
  }
  
  updateImageOptions(imagesArray){
     const listImages = imagesArray.map((image) =>
      <div 
        key={image.id} 
        className='image-options' 
        style={{backgroundImage: 'url(' + image.urls.regular + ')'}} 
        onClick={()=>{
          let optionsTemp = this.state.posterOptions;
          optionsTemp.chosenImage = image.urls.regular;
          this.setState({'posterOptions':optionsTemp},()=>{
            this.props.updatePosterOptions(this.state.posterOptions);
          });          
        }}
      >
      </div>
    );
    this.setState({'imageOptions':listImages});
  }

  getDefaultImages(){
    const url = global.api.url+'/photos?per_page=20'+global.api.id;
    fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
        .then((res) => {
          // console.log(res);
           this.updateImageOptions(res);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  searchForImages = () =>{
    console.log(this.state.searchString);
    if(this.state.searchString === '') return this.getDefaultImages();
    const url = global.api.url+'/search/photos?query='+this.state.searchString+'&per_page=20'+global.api.id;
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
        .then((res) => {
          console.log(res);
           this.updateImageOptions(res.results);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  updateTextAlign =(alignment)=>{
    let optionsTemp = this.state.posterOptions;
    optionsTemp.textAlign = alignment;
    this.setState({'posterOptions':optionsTemp},()=>{
      this.props.updatePosterOptions(this.state.posterOptions);
    });          
  }


  render() {
    return (
      <div className="control-bar">
        <h1>PostrMakr</h1>
        <div className="control-bar-section">
          <h3>Layout</h3>
          <select 
            value={this.props.posterOptions.layout}
            onChange={(e)=>{
              let optionsTemp = this.state.posterOptions;
              optionsTemp.layout = e.target.value;
              this.setState({'posterOptions':optionsTemp},()=>{
                this.props.updatePosterOptions(this.state.posterOptions);
              });          
            }}
          >
            <option value="layout_1">Layout 1</option>
            <option value="layout_2">Layout 2</option>
          </select>
        </div>

        <div className="control-bar-section">
          <h3>Image</h3>
          <div className="search-bar-holder">
            <input 
              className="search-bar" 
              placeholder="Search for an image!" 
              value={this.state.searchString}
              onChange={e =>  this.setState({'searchString': e.target.value})}
            />
            <button onClick={this.searchForImages}><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          <div className="image-option-display">
            {this.state.imageOptions}
          </div>
        </div>

        <div className="control-bar-section">
          <h3>Image Overlay Color</h3>

          <ChromePicker 
            color={this.props.posterOptions.imageOverlayColor}
            onChange={(color,e)=>{
              let optionsTemp = this.state.posterOptions;
              optionsTemp.imageOverlayColor = 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')';
              this.setState({'posterOptions':optionsTemp},()=>{
                this.props.updatePosterOptions(this.state.posterOptions);
              });          
            }}
          />

        </div>

        <div className="control-bar-section">
          <h3>Text</h3>
          <input 
            placeholder="Add a title" 
            value={this.props.posterOptions.text}
            onChange={(e)=>{
              let optionsTemp = this.state.posterOptions;
              optionsTemp.text = e.target.value;
              this.setState({'posterOptions':optionsTemp},()=>{
                this.props.updatePosterOptions(this.state.posterOptions);
              });          
            }}
          />
          <div className="text-placement-options">
            <button className="button" onClick={(e)=>{ this.updateTextAlign('left')}}>
              <FontAwesomeIcon icon={faAlignLeft} />
            </button>
            <button className="button" onClick={(e)=>{ this.updateTextAlign('center')}}>
              <FontAwesomeIcon icon={faAlignCenter} />
            </button>
            <button className="button" onClick={(e)=>{ this.updateTextAlign('right')}}>
              <FontAwesomeIcon icon={faAlignRight} />
            </button>
          </div>
 
          <input 
            type="range" min="10" max="85" step="1"
            value={this.props.posterOptions.textSize}
            onChange={(e)=>{
              let optionsTemp = this.state.posterOptions;
              optionsTemp.textSize = e.target.value;
              this.setState({'posterOptions':optionsTemp},()=>{
                this.props.updatePosterOptions(this.state.posterOptions);
              });          
            }}
          />
        </div>

      </div>
    );
  }
}

export default Controls