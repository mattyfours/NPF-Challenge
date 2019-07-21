import React from 'react'
import '../../global.js';

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAlignRight, faAlignLeft, faAlignCenter, faChevronDown } from '@fortawesome/free-solid-svg-icons'

// Import Colour Picker
import { ChromePicker } from 'react-color'

// Import html2canvas & jsPDF to download poster
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Search string for Unsplash image search
      searchString:'',
      // Will hold the options for pulled images
      imageOptions:[],
      // This state version of poster options
      posterOptions:{},
      // Toggle control bar sections
      controlBarToggle:{
        layout:false,
        image:false,
        text:false,
        border:false,
      }
    };
  }

  componentDidMount() {
    // Update this states options to equal the recieved props
    this.setState({'posterOptions': this.props.posterOptions});
    // Get default images to choose from
    this.getDefaultImages();
  }
  
  // Called adter getDefaultImages() or searchForImages(). Maps retruned images to be displayed in the image options
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

  // Called once mounted of is searchString equals ''. Used to get default images to choose from
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

  // Called onClick to search for images matching the searchString
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

  // Called onChange to updated the poster options
  updateOptions =(optionsTemp)=>{
    this.setState({'posterOptions':optionsTemp},()=>{
      this.props.updatePosterOptions(this.state.posterOptions);
    });          
  }

  render() {
    return (
      <div className="control-bar">       
        {/* Control Bar Title*/}
        <h1>PostrMakr</h1>

        {/* Layout Controls Go Here*/}
        <div className={ this.state.controlBarToggle.layout ? "control-bar-section open" : "control-bar-section" }>
          <button className="section-toggle"
            onClick={(e)=>{
              let toggleTemp = this.state.controlBarToggle;
              toggleTemp.layout = !toggleTemp.layout;
              this.setState({'controlBarToggle':toggleTemp});
            }}
          >Layout <FontAwesomeIcon icon={faChevronDown}/></button>

          <div className="control-bar-section-options">
            
            <h4>Choose a Layout</h4>
            {/* Select Layour Type*/}
            <select 
              value={this.props.posterOptions.layout}
              onChange={(e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.layout = e.target.value;
                this.updateOptions(optionsTemp);         
              }}
            >
              <option value="layout_1">Layout 1</option>
              <option value="layout_2">Layout 2</option>
            </select>
          </div>          
        </div>

        {/* Image Controls Go Here*/}
        <div className={ this.state.controlBarToggle.image ? "control-bar-section open" : "control-bar-section" }>
          <button className="section-toggle"
            onClick={(e)=>{
              let toggleTemp = this.state.controlBarToggle;
              toggleTemp.image = !toggleTemp.image;
              this.setState({'controlBarToggle':toggleTemp});
            }}
          >Image <FontAwesomeIcon icon={faChevronDown}/></button>
          
          <div className="control-bar-section-options">

            <h4>Poster Image</h4>
             {/* Search for images */}
            <div className="search-bar-holder">
              <input 
                className="search-bar" 
                placeholder="Search for an image!" 
                value={this.state.searchString}
                onChange={e =>  this.setState({'searchString': e.target.value})}
              />
              <button onClick={this.searchForImages}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            {/* Display Grid of Images */}
            <div className="image-option-display">
              {this.state.imageOptions}
            </div>

            <h4>Image Overlay</h4>
            {/* Choose Image Overlay Color*/}
            <ChromePicker 
              color={this.props.posterOptions.imageOverlayColor}
              onChange={(color,e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.imageOverlayColor= `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                this.updateOptions(optionsTemp);          
              }}
            />
          </div>
        </div>


        {/* Text Controls Go Here*/}
        <div className={ this.state.controlBarToggle.text ? "control-bar-section open" : "control-bar-section" }>
          <button className="section-toggle"
            onClick={(e)=>{
              let toggleTemp = this.state.controlBarToggle;
              toggleTemp.text = !toggleTemp.text;
              this.setState({'controlBarToggle':toggleTemp});
            }}
          >Text <FontAwesomeIcon icon={faChevronDown}/></button>
          

          <div className="control-bar-section-options">

            <h4>Poster Text</h4>
             {/* Input poster text*/}
            <input 
              placeholder="Add some text." 
              value={this.props.posterOptions.text}
              onChange={(e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.text = e.target.value;
                this.updateOptions(optionsTemp);         
              }}
            />
             
            <h4>Text Alignment</h4>
            {/* Text alignment Options | Horizantal followed by verticle*/}
            <div className="text-placement-options">
              <button className="button" onClick={(e)=>{ 
                let optionsTemp = this.state.posterOptions;
                optionsTemp.textAlign = 'left';
                this.updateOptions(optionsTemp);
              }}>
                <FontAwesomeIcon icon={faAlignLeft} />
              </button>
              <button className="button" onClick={(e)=>{ 
                let optionsTemp = this.state.posterOptions;
                optionsTemp.textAlign = 'center';
                this.updateOptions(optionsTemp);
              }}>
                <FontAwesomeIcon icon={faAlignCenter} />
              </button>
              <button className="button" onClick={(e)=>{ 
                let optionsTemp = this.state.posterOptions;
                optionsTemp.textAlign = 'right';
                this.updateOptions(optionsTemp);
              }}>
                <FontAwesomeIcon icon={faAlignRight} />
              </button>
            </div>

            <h4>Text Size</h4>
             {/* Range slider for text size*/}
            <input 
              type="range" min="10" max="85" step="1"
              value={this.props.posterOptions.textSize}
              onChange={(e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.textSize= e.target.value;
                this.updateOptions(optionsTemp);         
              }}
            />

            <h4>Text Color</h4>
            {/* Color Picker for text size*/}
            <ChromePicker 
              color={this.props.posterOptions.textColor}
              onChange={(color,e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.textColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                this.updateOptions(optionsTemp);           
              }}
            />
          </div>
        </div>

        {/* Border Controls Go Here*/}
        <div className={ this.state.controlBarToggle.border ? "control-bar-section open" : "control-bar-section" }>
          <button className="section-toggle"
            onClick={(e)=>{
              let toggleTemp = this.state.controlBarToggle;
              toggleTemp.border = !toggleTemp.border;
              this.setState({'controlBarToggle':toggleTemp});
            }}
          >Border <FontAwesomeIcon icon={faChevronDown}/></button>
          

          <div className="control-bar-section-options">

            <h4>Border Width</h4>
             {/* Range slider for text size*/}
            <input 
              type="range" min="0" max="55" step="1"
              value={this.props.posterOptions.borderWidth}
              onChange={(e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.borderWidth = e.target.value;
                this.updateOptions(optionsTemp);         
              }}
            />

            <h4>Border Color</h4>
            {/* Color Picker for text size*/}
            <ChromePicker 
              color={this.props.posterOptions.borderColor}
              onChange={(color,e)=>{
                let optionsTemp = this.state.posterOptions;
                optionsTemp.borderColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                this.updateOptions(optionsTemp);           
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Controls