import React from 'react'
import '../../global.js';

class Poster extends React.Component {

  render() {
    return (
      <div className="poster-holder">
        <div className={'poster ' + this.props.posterOptions.layout }>
          <div className='poster-image' style={{backgroundImage: 'url(' + this.props.posterOptions.chosenImage + ')'}}/>
          <div className="poster-image-overlay"
            style={{
              background: this.props.posterOptions.imageOverlayColor
            }}
          />
          <div className="poster-text-holder">
            <div className="poster-text">
              <h1
                style={{
                  textAlign: this.props.posterOptions.textAlign,
                  fontSize: this.props.posterOptions.textSize+'pt',
                  lineHeight: this.props.posterOptions.textSize+'pt'
                }}
              >{this.props.posterOptions.text}</h1>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Poster