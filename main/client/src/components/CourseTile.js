import React from 'react';
import Text from '../components/Text.js';
import '../css/CourseTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CourseTile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="coursetile">
            <Container fluid>
                <Row>
                    <Col>
                        {/* TODO: <img>
                            id={this.props.imgId}
                            src={this.props.imgSrc}
                            alt={this.props.imgAlt}
                        </img> */}
                    </Col>
                    <Col>
                        <Text
                            className={this.props.classNameCoursetext}
                            value={this.props.valuetext}>
                        </Text>
                    </Col>
                    <Col>
                        {/* TODO: Playbutton */}
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default CourseTile;