import React from 'react';
import Text from '../components/Text.js';
import '../css/QuestionTile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class QuestionTile extends React.Component {

    constructor(props){
        super(props);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    handleCheckboxChange(data) {
        // console.log('QUESTIONTILE-STATUS:' + data)
        this.props.onCheckboxChange(data)
    }



    render(){
        return(
        <div className="questiontile">
            <Container fluid>
                <Row>
                    <Col xs={2} sm={2} md={1}>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name={this.props.labelCheckbox}
                                checked={this.props.isSelectedCheckbox}
                                onChange={() => this.handleCheckboxChange(this.props.labelCheckbox)}
                                className="form-check-input">
                            </input>
                        </div>
                    </Col>
                    <Col xs={8} sm={8} md={8}>
                        <Text
                            className="questiontext"
                            value={this.props.questiontext}>
                        </Text>
                    </Col>
                    <Col xs={2} sm={2} md={3}>
                        <Text
                            className="coursetext"
                            value={this.props.coursetext}>
                        </Text>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}

export default QuestionTile;