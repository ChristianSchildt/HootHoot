import React from 'react';
import Text from '../components/Text.js';
import '../css/Components.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CourseTile extends React.Component {

    render(){
        return(
        <div className="coursetile">
            <Container fluid>
                <Row>
                    <Col>
                        {/* <img>
                            id={this.props.imgId}
                            src={this.props.imgSrc}
                            alt={this.props.imgAlt}
                        </img> */}
                    </Col>
                    <Col>
                        <Text
                            className={this.props.coursetext}
                            value={this.props.textvalue}>
                        </Text>
                    </Col>
                    <Col>
                        {/* Playbutton */}
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default CourseTile;