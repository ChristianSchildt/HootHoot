import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/CreateAnswer.css';
import Imagebutton from './Imagebutton';
import Text from './Text';

class CreateAnswer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {value: this.props.valueTextarea};
        // this.textareaRef = React.createRef();

        this.handleTextareaChange = this.handleTextareaChange.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.defaultValue !== this.props.defaultValue) {
    //         this.textareaRef.current.value = this.props.defaultValue;
    //     }
    // }
    
    handleTextareaChange(event) {
        this.setState({value: event.target.value})
    }

    getValue() {
        return this.state.value 
        // !== "" ? this.state.value : (this.props.valueTextarea || "") 
    }

    render(){
        return(
            <div className="create-answer">
                <Container fluid>
                    <Row>
                        <Col md={1}>
                            <Text
                                className={this.props.classNameText}
                                value={this.props.valueText}>
                            </Text>
                        </Col>
                        <Col md={7}>
                            <textarea 
                                className={this.props.classNameTextarea}
                                id={this.props.idTextarea}
                                placeholder={this.props.placeholderTextarea}
                                value={this.state.value}
                                // ref={this.textareaRef}
                                onChange={this.props.onChangeTextarea}
                                rows="2" 
                                cols="35">
                            </textarea>
                        </Col>
                        <Col md={2}>
                            <Imagebutton
                                className={this.props.classNameImagebuttonCheckbox}
                                id={this.props.idImagebuttonCheckbox}
                                src={this.props.srcImagebuttonCheckbox}
                                alt={this.props.altImagebuttonCheckbox}
                                onClick={this.props.onClickImagebuttonCheckbox}>
                            </Imagebutton>
                        </Col>
                        <Col md={2}>
                            <Imagebutton
                                className={this.props.classNameImagebuttonPicture}
                                src={this.props.srcImagebuttonPicture}
                                alt={this.props.altImagebuttonPicture}
                                onClick={this.props.onClickImagebuttonPicture}>
                            </Imagebutton>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


}

export default CreateAnswer;