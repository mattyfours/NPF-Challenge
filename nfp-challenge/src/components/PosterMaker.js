import React from 'react'
import '../global.js';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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


  render() {
    return (
      <div className={ this.state.isTransition ? "app-page inTransition" : "app-page" }>
        asc
      </div>
    );
  }
}

export default Welcome