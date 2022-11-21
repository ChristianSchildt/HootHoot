import React from 'react';
import '../css/Swinner.css';
import Container from 'react-bootstrap/Container';
import Text from './Text';


class Swinner extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='swinner'>
            <Container fluid>
                        <Text
                            className="winnerfirst"
                            value={this.props.valuefirst}>
                        </Text>
                        <Text
                        className="winnerfirst-under"
                         value="1.st"/>
                        <Text
                            className="winnersecond"
                            value={this.props.valuesecond}>
                        </Text>
                        <Text
                        className="winnersecond-under"
                        value="2.st"/>
                        <Text
                            className="winnerthird"
                            value={this.props.valuethird}>
                        </Text>
                        <Text
                        className="winnerthird-under"
                        value="3.st"/>
            </Container>
            </div>
        )
    }
}

export default Swinner;