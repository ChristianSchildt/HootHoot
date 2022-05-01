import React from 'react';
import '../css/Picture.css';

class Picture extends React.Component {
  
  render() {
    return (
      <div className="div-picture">
        <a href={this.props.href}>
            <img
                id={this.props.id}
                src={this.props.src}
                alt={this.props.alt}>
            </img>
        </a>
      </div>
    )
  }
}

export default Picture;