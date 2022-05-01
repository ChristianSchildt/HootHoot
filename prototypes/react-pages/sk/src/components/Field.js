import React from 'react';
import '../css/Field.css';
import Text from './Text';

class Field extends React.Component {

    constructor(props){
      super(props);

    }

    render() {
    return (
        <div className={this.props.classNameField}>
            <Text 
              className={this.props.classNameTitle}
              value={this.props.valueTitle}>
            </Text>
            {this.props.children}
        </div>
    )
  }
}

export default Field;