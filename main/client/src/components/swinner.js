import React from 'react';
import '../css/Text.css';

class swinner extends React.Component{
    constructor(props){
        super(props);
    }

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