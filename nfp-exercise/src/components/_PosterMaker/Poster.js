import React from 'react'
import '../../global.js';



// This component renders the designed poster
class Poster extends React.Component {

  render() {
    return (
      <div className="poster-holder">
        {/* Main Poster with the layout options*/}
        <div className={'poster ' + this.props.posterOptions.layout } id="poster">
          {/* Background Image Div */}
          <div className='poster-image' 
            style={{backgroundImage: 'url(' + this.props.posterOptions.chosenImage + ')'}}
          />
          {/* Image Overlay Div*/}
          <div className="poster-image-overlay"
            style={{
              background: this.props.posterOptions.imageOverlayColor
            }}
          />
          {/* Text Holder With Text Div*/}
          <div className="poster-text-holder"
            style={{
              alignItems:this.props.posterOptions.textVertAlign,
            }}
          >
            <div className="text-wrapper">
              <h1
                style={{
                  textAlign: this.props.posterOptions.textAlign,
                  fontSize: this.props.posterOptions.textSize+'pt',
                  lineHeight: this.props.posterOptions.textSize+'pt',
                  color: this.props.posterOptions.textColor
                }}
              >{this.props.posterOptions.text}</h1>
              <h2
                style={{
                  marginTop: this.props.posterOptions.textSpacing+'px',
                  fontSize: this.props.posterOptions.subtitleTextSize+'pt',
                  lineHeight: this.props.posterOptions.subtitleTextSize+'pt',
                  textAlign: this.props.posterOptions.textAlign,
                  color: this.props.posterOptions.textColor
                }}
              >{this.props.posterOptions.subtitleText}</h2>
            </div>
          </div>

          {/* Poster Border Div*/}
          <div className="poster-border"
            style={{
              borderWidth: this.props.posterOptions.borderWidth+'px',
              borderColor: this.props.posterOptions.borderColor,
            }}
          />

        </div>
      </div>
    );
  }
}

export default Poster