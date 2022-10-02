import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/QuestionOption.css';
import Text from './Text';

class QuestionOptions extends React.Component{

    render(){
        return(
            <div className="question-option">
                <Container fluid>
                    <Row>
                        <Col>
                            <Text
                                className={this.props.classNameText}
                                value={this.props.valueText}>
                            </Text>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}

export default QuestionOptions;