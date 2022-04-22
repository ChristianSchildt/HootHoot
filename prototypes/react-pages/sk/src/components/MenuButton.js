import React from 'react';
import '../css/Components.css';

class MenuButton extends React.Component {
  
  render() {
    return (
        <a href={this.props.href}>
            <p 
                id={this.props.id} 
                className={this.props.className}>
                {this.props.value}
            </p>
        </a>
    )
  }
}

export default MenuButton;