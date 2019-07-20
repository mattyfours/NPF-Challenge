import React from 'react'
import '../global.js';


import Controls from './_PosterMaker/Controls'
import Poster from './_PosterMaker/Poster'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posterOptions:{
        layout:'layout_1',
        chosenImage:'',
        imageOverlayColor:'',
        text:'FullScript is Awesome!',
        textAlign:'center',
        textSize:40
      },
      backgroundImages:null,
      isTransition: true,
    };
  }

  componentDidMount() {
    // Remove Transition Screen
    let self = this;
    setTimeout(function() {
      self.setState({'isTransition':false});
    },200);    
  }

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