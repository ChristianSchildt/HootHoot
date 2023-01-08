import React from 'react';
import Text from './Text.js';
import '../css/ContentWinner.css';

class ContentWinner extends React.Component {

    render(){
        return(
        <div className=''>
            <div className="ContentWinner">
                <h1 
                    id={this.props.headerid}
                        className="header">
                    {this.props.contentwinner}
                </h1>
                <div className='winnerfirst'>
                <h1
                    id={this.props.headerid}
                        className="first">
                    {this.props.first}
                </h1>
                </div>
                <div className='winnersecond'>
                <h2
                    id={this.props.headerid}
                        className="second">
                    {this.props.second}
                </h2>
                </div>
                <div className='winnerthird'>
                <h3
                    id={this.props.headerid}
                        className="third">
                    {this.props.third}
                </h3>
                <div className="third"></div>
                </div>
            </div>
        </div>
        )
    }
}

export default ContentWinner;