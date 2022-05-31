import React from 'react';
import Text from '../components/Text.js';
import '../css/CourseTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Imagebutton from './Imagebutton.js';
import Picture from './Picture.js';

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
                        <Picture
                            classname="picture-course"
                            src={this.props.srcPicture}
                            alt="Kursbild">
                        </Picture>
                    </Col>
                    <Col>
                        <Text
                            className="coursetext"
                            value={this.props.valuetext}>
                        </Text>
                    </Col>
                    <Col>
                        <Imagebutton
                            className="button-coursePlay"
                            /*TODO: Besseres Bild*/
                            src="/images/play.jpg"  
                            alt="Play Symbol"
                            href="/teacher/letStudentsJoin">
                        </Imagebutton>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default CourseTile;