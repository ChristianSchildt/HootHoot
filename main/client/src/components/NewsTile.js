import React from 'react';
import Text from './Text.js';
import '../css/NewsTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewsTile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="newstile">
            <Container fluid>
                <Row>
                    <Col>
                        <Text
                            className={this.props.classNameNewstext}
                            value={this.props.valuetext}>
                        </Text>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default NewsTile;