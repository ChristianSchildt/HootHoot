import React from 'react';
import Text from './Text.js';
import '../css/HeaderQuestion.css';

class HeaderQuestion extends React.Component {

    render(){
        return(
        <div className="HeaderQuestion">
            <h1 
                id={this.props.headerid}
                    className="Question">
                {this.props.question}
            </h1>
        </div>
        )
    }
}

export default HeaderQuestion;