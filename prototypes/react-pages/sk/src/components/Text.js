import React from 'react';
import '../css/Components.css';

class Text extends React.Component{

    render(){
        return(
            <p 
                id={this.props.id} 
                className={this.props.className}>
                {this.props.value}
            </p>
        )
    }


}

export default Text;