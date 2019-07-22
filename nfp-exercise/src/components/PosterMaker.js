import React from 'react'
import '../global.js';

// Import Components
import Controls from './_PosterMaker/Controls'
import Poster from './_PosterMaker/Poster'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All poster Options
      posterOptions:{
        layout:'layout_1',
        chosenImage:'',
        imageOverlayColor:'rgba(0,0,0,0.5)',
        text:'Natural Partners Fullscript',
        textAlign:'center',
        textVertAlign:'center',
        textSize:40,
        subtitleText:'What an awesome team!',
        subtitleTextSize:20,
        textSpacing:20,
        textColor:'rgba(255,255,255,1)',
        borderWidth:20,
        borderColor:'rgba(255,255,255,1)',
      },
      // Boolean for route transition
      isTransition: true,
    };
  }

  componentDidMount() {
    // Remove Transition Screen
    let self = this;
    setTimeout(function() {
      self.setState({'isTransition':false});
    },200);    

    // Get random image as starting image
    this.getRandomImage();
  }

  // Called from mount to get starting image
  getRandomImage(){
    const url = global.api.url+'/photos/random?'+global.api.id;
    fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      }).then((response) => response.json())
        .then((res) => {
          // console.log(res);
          let tempOptions = this.state.posterOptions;
          tempOptions.chosenImage = res.urls.regular;
          this.setState({'posterOptions':tempOptions});
        })
        .catch((error) => {
          console.error(error);
        });
  }

  // Called when Controls component updated Poser Options
  updatePosterOptions = (updatedOptions) => {
    this.setState({'posterOptions': updatedOptions});
  }

  render() {
    return (
      <div className={ this.state.isTransition ? "app-page inTransition" : "app-page" }>
        <Controls updatePosterOptions={this.updatePosterOptions} posterOptions={this.state.posterOptions}/>
        <Poster posterOptions={this.state.posterOptions}/>
      </div>
    );
  }
}

export default Welcome