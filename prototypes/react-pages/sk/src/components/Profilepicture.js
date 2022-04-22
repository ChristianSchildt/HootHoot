import React from 'react';
import '../css/Components.css';

class Profilepicture extends React.Component {
  
  render() {
    return (
        <a href={this.props.href}>
            <img>
                id={this.props.id}
                src={this.props.src}
                alt={this.props.alt}
            </img>
        </a>
    )
  }
}

export default Profilepicture;