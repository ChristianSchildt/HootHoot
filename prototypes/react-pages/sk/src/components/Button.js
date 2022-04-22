import React from 'react';
import '../css/Components.css';

class Button extends React.Component {
  
  render() {
    return (
        <a href={this.props.href}>
          <button 
            className={this.props.className} /*Darf nicht "class" heißen*/
            id={this.props.id}
            type="submit"
            onClick={this.props.onClick}> 
            {this.props.value}
          </button>
        </a>
    )
  }
}

export default Button;