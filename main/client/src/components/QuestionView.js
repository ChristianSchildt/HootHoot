import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/QuestionView.css';
import Text from './Text';
import Imagebutton from './Imagebutton';

class QuestionView extends React.Component{

    render(){
        return(
            <div className="question-view">
                <Container fluid>
                    <Row>
                        <Col md={2}>
                        <Row>
                            <Imagebutton
                                id={this.props.idImagebuttonDuplicate}
                                className={this.props.classNameImagebuttonDuplicate}
                                src={this.props.srcImagebuttonDuplicate}
                                alt={this.props.altImagebuttonDuplicate}
                                onClick={this.props.onClickImagebuttonDuplicate}>
                            </Imagebutton>
                        </Row>
                        <Row>
                            <Imagebutton
                                id={this.props.idImagebuttonDelete}
                                className={this.props.classNameImagebuttonDelete}
                                src={this.props.srcImagebuttonDelete}
                                alt={this.props.altImagebuttonDelete}
                                onClick={this.props.onClickImagebuttonDelete}>
                            </Imagebutton>
                        </Row>
                        </Col>
                        <Col md={10}>
                            <Text
                                className={this.props.classNameText}
                                value={this.props.valueText}>
                            </Text>
                        </Col>
                        <hr id="question-view-hr"/>
                    </Row>
                </Container>
            </div>
        )
    }


}

export default QuestionView;