import React from 'react';
import Text from '../components/Text.js';
import '../css/HeaderRole.css';

class HeaderRole extends React.Component {

    render(){
        return(
        <div className="headerrole">
            <h1 
                id={this.props.headerid}
                className="headertext">
                {this.props.headervalue}
            </h1>
            <p 
                id={this.props.roleid} 
                className="roletext">
                {this.props.rolevalue}
            </p>
        </div>
        )
    }
}

export default HeaderRole;