import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import InputField from '../components/InputField';
import Imagebutton from '../components/Imagebutton';
import Field from '../components/Field';
import CreateAnswer from '../components/CreateAnswer';
import QuestionView from '../components/QuestionView';
import QuestionOption from '../components/QuestionOption';
import FileInput from '../components/FileInput';

class t_CreateHootHootPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            checkboxImageA: "/images/checkbox_unpressed.jpg",
            checkboxImageB: "/images/checkbox_unpressed.jpg",
            checkboxImageC: "/images/checkbox_unpressed.jpg",
            checkboxImageD: "/images/checkbox_unpressed.jpg",
            image: 0,
            imageData: 0,

            questions : [
                {   
                    "id": 1,
                    "name": "Wie alt ist die Erde?"
                },
                {   
                    "id": 2,
                    "name": "Wie lange bestand das Römische Reich?"
                },
                {   
                    "id": 3,
                    "name": "Wann entstand die Informatik?"
                }
            ],

            
        };
    }
    
    pressOrUnpressAnswerCheckbox(idImagebuttonCheckbox) {
        if (idImagebuttonCheckbox === 'answer-checkbox-A') {
            if (this.state.checkboxImageA === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({checkboxImageA: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({checkboxImageA: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-B') {
            if (this.state.checkboxImageB === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({checkboxImageB: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({checkboxImageB: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-C') {
            if (this.state.checkboxImageC === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({checkboxImageC: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({checkboxImageC: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-D') {
            if (this.state.checkboxImageD === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({checkboxImageD: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({checkboxImageD: "/images/checkbox_unpressed.jpg"})
            }
        }
    }
    //TODO: 
    //Funktioniert noch nicht
    // addNewQuestion() {
    //     this.setState({ questions.push(
    //     {   
    //         "id": this.state.questions.length+1,
    //         "name": ""
    //     })})
    // }

    fileSelectedHandler(event) {
        if(event.target.files[0])
        {
          this.setState({image: event.target.files[0]});
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            this.setState({imageData: reader.result});
          });
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    render(){
        return(
            <div className = "tCreateHootHootPage">
                <Container fluid>
                    <Row>
                        <Col md={2}>
                            <Picture
                                id="logomenue"
                                src="/images/profil.png"
                                alt="Platzhalter Profilbild">
                            </Picture>
                            <Text
                                className="projectname-left"
                                value="HootHoot">
                            </Text>
                        </Col>
                        <Col md={4}>
                            <InputField
                                className="inputField"
                                id="inputField-coursename"
                                placeholder="Kursnamen eingeben...">
                            </InputField>
                        </Col>
                        <Col md={4}>
                            <select name="" id="dropdown-menu-course">
                                {/* TODO: einbeziehen */}
                                <option value="" selected="selected">bisheriger Kurs 1</option>
                                <option value="" selected="">bisheriger Kurs 2</option>
                            </select>
                        </Col>
                        <Col md={2}>
                            <Imagebutton
                                id="button-save"
                                src="/images/save.jpg"
                                alt="save-Symbol"
                                onClick={() => alert('TODO: Hier würde gespeichert werden')}>
                            </Imagebutton>
                            <Imagebutton
                                id="button-exit"
                                src="/images/exit.jpg"
                                alt="exit-Symbol"
                                href="/teacher/homeMenu">
                            </Imagebutton>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Field idField="question-overview">
                                {this.state.questions.map((question) => (  
                                    <QuestionView 
                                        key={question.id.toString()}
                                        classNameImagebuttonDuplicate="question-view-duplicate"
                                        srcImagebuttonDuplicate="/images/duplicate.jpg"
                                        altImagebuttonDuplicate="duplicateButton"
                                        onClickImagebuttonDuplicate={() => alert('Frage soll dupliziert werden')}
                                        classNameImagebuttonDelete="question-view-delete"
                                        srcImagebuttonDelete="/images/delete.jpg"
                                        altImagebuttonDelete="deleteButton"
                                        onClickImagebuttonDelete={() => alert('Frage soll gelöscht werden')}
                                        classNameText="question-overview-text" 
                                        valueText={question.name}>
                                        {/* TODO: Duplicate- und Delete-Button, 
                                        können auch außerhalb der Optik geklickt werden?! -> ändern */}
                                    </QuestionView>
                                ))}
                                <Imagebutton
                                    className="add-new-question"
                                    src="/images/addNewQuestion.jpg"
                                    alt="neueFrageErstellen-Button"
                                    onClick={() => alert('TODO: Hier würde sich eine neue Fragenfolie öffnen')
                                    // this.addNewQuestion()
                                    }>
                                </Imagebutton>
                            </Field>
                        </Col>
                        <Col md={8}>
                            <InputField
                                className="inputField"
                                id="inputField-question"
                                placeholder="Frage eingeben...">
                            </InputField>
                            <Field idField="media-input">
                                <Picture
                                    id="question-picture-preview"
                                    src={this.state.imageData}
                                    alt="Bild-Preview">
                                </Picture>
                                <FileInput
                                    inputId="fileInputQuestionPicture"
                                    // labelValue="Produktbild auswählen"
                                    inputOnChange={this.fileSelectedHandler.bind(this)}>  
                                </FileInput>
                            </Field>
                            <Row>
                                <Col md={6}>
                                    <CreateAnswer
                                        classNameText="create-answer-letter"
                                        valueText="A"
                                        classNameInputField="create-answer-InputField"
                                        placeholderInputField="Antwort eintippen ..."
                                        classNameTextarea="create-answer-textarea"
                                        placeholderTextarea="Antwort eintippen ..."
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-A"
                                        srcImagebuttonCheckbox= {this.state.checkboxImageA}
                                        altImagebuttonCheckbox="ImageCheckbox"
                                        onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-A")}
                                        classNameImagebuttonPicture="create-answer-picture"
                                        srcImagebuttonPicture="/images/symbol_picture.png"
                                        altImagebuttonPicture="ImagePicture"
                                        onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                                    </CreateAnswer>
                                </Col>
                                <Col md={6}>
                                    <CreateAnswer
                                        classNameText="create-answer-letter"
                                        valueText="B"
                                        classNameInputField="create-answer-InputField"
                                        placeholderInputField="Antwort eintippen ..."
                                        classNameTextarea="create-answer-textarea"
                                        placeholderTextarea="Antwort eintippen ..."
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-B"
                                        srcImagebuttonCheckbox= {this.state.checkboxImageB}
                                        altImagebuttonCheckbox="ImageCheckbox"
                                        onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-B")}
                                        classNameImagebuttonPicture="create-answer-picture"
                                        srcImagebuttonPicture="/images/symbol_picture.png"
                                        altImagebuttonPicture="ImagePicture"
                                        onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                                    </CreateAnswer>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <CreateAnswer
                                        classNameText="create-answer-letter"
                                        valueText="C"
                                        classNameInputField="create-answer-InputField"
                                        placeholderInputField="Antwort eintippen ..."
                                        classNameTextarea="create-answer-textarea"
                                        placeholderTextarea="Antwort eintippen ..."
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-C"
                                        srcImagebuttonCheckbox= {this.state.checkboxImageC}
                                        altImagebuttonCheckbox="ImageCheckbox"
                                        onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-C")}
                                        classNameImagebuttonPicture="create-answer-picture"
                                        srcImagebuttonPicture="/images/symbol_picture.png"
                                        altImagebuttonPicture="ImagePicture"
                                        onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                                    </CreateAnswer>
                                </Col>
                                <Col md={6}>
                                    <CreateAnswer
                                        classNameText="create-answer-letter"
                                        valueText="D"
                                        classNameInputField="create-answer-InputField"
                                        placeholderInputField="Antwort eintippen ..."
                                        classNameTextarea="create-answer-textarea"
                                        placeholderTextarea="Antwort eintippen ..."
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-D"
                                        srcImagebuttonCheckbox= {this.state.checkboxImageD}
                                        altImagebuttonCheckbox="ImageCheckbox"
                                        onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-D")}
                                        classNameImagebuttonPicture="create-answer-picture"
                                        srcImagebuttonPicture="/images/symbol_picture.png"
                                        altImagebuttonPicture="ImagePicture"
                                        onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                                    </CreateAnswer>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={2}>
                            <Field
                                idField="question-options">
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Fragentyp">
                                    <select name="" id="dropdown-menu">
                                    {/* TODO: einbeziehen */}
                                        <option value="" selected="selected">Quiz</option>
                                        <option value="" selected="">Wahr oder Falsch</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Zeitlimit">
                                    <select name="" id="dropdown-menu">
                                    {/* TODO: einbeziehen */}
                                        <option value="" selected="">10 Sekunden</option>
                                        <option value="" selected="selected">20 Sekunden</option>
                                        <option value="" selected="">30 Sekunden</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Punkte">
                                    <select name="" id="dropdown-menu">
                                        {/* TODO: einbeziehen */}
                                        <option value="" selected="selected">Standard</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Antwortmöglichkeiten">
                                    <select name="" id="dropdown-menu">
                                        {/* TODO: einbeziehen */}
                                        <option value="" selected="selected">Einzelauswahl</option>
                                        <option value="" selected="">Mehrfachauswahl</option>
                                    </select>
                                </QuestionOption>
                            </Field>
                        </Col>    
                    </Row>            
                </Container>
            </div>
       );
    }
}

export default t_CreateHootHootPage;