import React from 'react';
import Text from './Text.js';
import '../css/ContentQuestion.css';

class ContentQuestion extends React.Component {

    render(){
        return(
        <div className="ContentQuestion">
            <h1 
                id={this.props.headerid}
                    className="Content">
                {this.props.contentquestion}
            </h1>
            <div className="ContentImg">
                <img className="ContentBild"
                   id={this.props.id}
                   src={this.props.src}
                   alt={this.props.alt}>
                </img>              
            </div>
        </div>
        )
    }
}

export default ContentQuestion;