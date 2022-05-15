import React from 'react';
import '../css/Imagebutton.css';

class Imagebutton extends React.Component {

  render() {
    return (
        <a href={this.props.href}
          onClick={this.props.onClick}>
          <img 
            id={this.props.id}
            className={this.props.className}  /*Darf nicht "class" heißen*/
            src={this.props.src}
            alt={this.props.alt}>
          </img>
        </a>
    )
  }
}

export default Imagebutton;