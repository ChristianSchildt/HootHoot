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
            image: 0,
            imageData: 0,
            selectTyp: "quiz",
            selectTimelimit: 10,
            selectPoints: null,
            selectAnswerOptions: "einzelauswahl",
            courses : {
                "couseId": 0,
                "courseName": "Beispielkurs",
                "questions": [ 
                    {"id" : 0,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage1",
                    "url": null,
                    "typ": "Quiz",
                    "timelimit": 10,
                    "points": null},
                    {"id": 1,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage2",
                    "url": null,
                    "typ": "Wahr oder Falsch",
                    "timelimit": 20,
                    "points": null}
                ],
                "answers": [
                    {id: 0,
                    "answerOptions": "Einzelauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort11", "Antwort12", "Antwort13", "Antwort14"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"
                    },
                    {id: 1,
                    "answerOptions": "Mehrfachauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort21", "Antwort22", "Antwort23", "Antwort24"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"
                    }
                ]
            },
            // courses: {},
            selectedQuestionIndex: 0
        };

        this.inputCoursename = React.createRef(null);
        //bisheriger Kurs
        this.inputQuestionname = React.createRef(null);
        this.inputAnswernameA = React.createRef(null);
        this.inputAnswernameB = React.createRef(null);
        this.inputAnswernameC = React.createRef(null);
        this.inputAnswernameD = React.createRef(null);
        //Acorrect
        //Bcorrect
        //Ccorrect
        //Dcorrect

        this.handleChangeTyp = this.handleChangeTyp.bind(this);
        this.handleChangeTimelimit = this.handleChangeTimelimit.bind(this);
        this.handleChangePoints = this.handleChangePoints.bind(this);
        this.handleChangeAnswerOptions = this.handleChangeAnswerOptions.bind(this);
    }
    
    // TODO: Funktioniert nicht --> innerhalb von setState
    pressOrUnpressAnswerCheckbox(idImagebuttonCheckbox) {
        if (idImagebuttonCheckbox === 'answer-checkbox-A') {
            if (this.state.courses.answers[0].isCorrectA === "/images/checkbox_unpressed.jpg") 
            {
                alert("Hey")
                this.setState({isCorrectA: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectA: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-B') {
            if (this.state.courses.answers[0].isCorrectB === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectB: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectB: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-C') {
            if (this.state.courses.answers[0].isCorrectC === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectC: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectC: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-D') {
            if (this.state.courses.answers[0].isCorrectD === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectD: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectD: "/images/checkbox_unpressed.jpg"})
            }
        }
    }
    
    //TODO: 
    //Funktioniert noch nicht
    addNewQuestion() {
    //     this.setState(prevState => ({
    //         questions:{
    //             ...prevState.questions,
    //             'id': this.state.questions.length+1,
    //             'name': ""
    //         }})
    // )  
    }

    //TODO:
    //Funktioniert noch nicht
    duplicateQuestion(questionId) {
        this.setState({

    })}

    // TODO:
    //Funktioniert noch nicht
    deleteQuestion(questionId) {
        this.setState({

    })}

    // TODO:
    //Funktioniert noch nicht
    selectQuestion(questionId) {
        this.setState({selectedQuestionIndex: questionId})
    }

    // TODO:
    //Funktioniert noch nicht
    saveQuestion() {
        let course = {
            courseId: null, //TODO: KursId einfügen
            courseName: this.inputCoursename.current.getValue(),
            questions: [
                {id: this.state.selectedQuestionIndex,
                topic: null,
                name: this.inputQuestionname.current.getValue(),
                url: this.state.imageData || this.state.courses.questions[this.state.selectedQuestionIndex].url,
                typ: this.state.selectTyp,
                timelimit: this.state.selectTimelimit,
                points: this.state.selectPoints}
            ],
            "answers": [
                {id: this.state.selectedQuestionIndex,
                "answerOptions": this.state.selectAnswerOptions, //Hier richtig oder zu questions?
                "answersArray": [this.inputAnswernameA.current.getValue(),
                                this.inputAnswernameB.current.getValue(), 
                                this.inputAnswernameC.current.getValue(), 
                                this.inputAnswernameD.current.getValue()],
                "isCorrectA": this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectA,
                "isCorrectB": this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectB,
                "isCorrectC": this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectC,
                "isCorrectD": this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectD}
            ]
        }
        console.log(course)
    }

    handleChangeTyp(event) {
        this.setState({selectTyp: event.target.value})
    }

    handleChangeTimelimit(event) {
        this.setState({selectTimelimit: event.target.value})
    }

    handleChangePoints(event) {
        this.setState({selectPoints: event.target.value})
    }
    
    handleChangeAnswerOptions(event) {
        this.setState({selectAnswerOptions: event.target.value})
    }

    //TODO: Richtige Variable image bzw. imageData?
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
                                placeholder="Kursnamen eingeben..."
                                defaultValue={this.state.courses.courseName}
                                ref={this.inputCoursename}>
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
                                onClick={() => this.saveQuestion(this.state.selectedQuestionIndex)}>
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
                                {this.state.courses.questions.map((question) => (  
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
                                        valueText={question.name}
                                        classNameQuestionSelectionButton="question-selection-button"
                                        onClickQuestionSelectionButton={() => this.selectQuestion(question.id)}>
                                        {/* TODO: Duplicate- und Delete-Button, 
                                        können auch außerhalb der Optik geklickt werden?! -> ändern */}
                                    </QuestionView>
                                ))}
                                <Imagebutton
                                    className="add-new-question"
                                    src="/images/addNewQuestion.jpg"
                                    alt="neueFrageErstellen-Button"
                                    onClick={() => this.addNewQuestion()}>
                                </Imagebutton>
                            </Field>
                        </Col>
                        <Col md={8}>
                            <InputField
                                className="inputField"
                                id="inputField-question"
                                placeholder="Frage eingeben..."
                                defaultValue={this.state.courses.questions[this.state.selectedQuestionIndex].name}
                                ref={this.inputQuestionname}>
                            </InputField>
                            <Field idField="media-input">
                                <Picture
                                    id="question-picture-preview"
                                    src={this.state.imageData || this.state.courses.questions[this.state.selectedQuestionIndex].url}
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
                                        valueTextarea={this.state.courses.answers[this.state.selectedQuestionIndex].answersArray[0]}
                                        // ref={this.inputAnswernameA}
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-A"
                                        srcImagebuttonCheckbox= {this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectA}
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
                                        valueTextarea={this.state.courses.answers[this.state.selectedQuestionIndex].answersArray[1]}
                                        // ref={this.inputAnswernameB}
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-B"
                                        srcImagebuttonCheckbox= {this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectB}
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
                                        valueTextarea={this.state.courses.answers[this.state.selectedQuestionIndex].answersArray[2]}
                                        // ref={this.inputAnswernameC}
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-C"
                                        srcImagebuttonCheckbox= {this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectC}
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
                                        valueTextarea={this.state.courses.answers[this.state.selectedQuestionIndex].answersArray[3]}
                                        // ref={this.inputAnswernameD}
                                        onChangeTextarea={this.handleTextareaChange}
                                        classNameImagebuttonCheckbox="create-answer-checkbox"
                                        idImagebuttonCheckbox="answer-checkbox-D"
                                        srcImagebuttonCheckbox= {this.state.courses.answers[this.state.selectedQuestionIndex].isCorrectD}
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
                                    <select name="" id="dropdown-menu" 
                                            value={this.state.value} onChange={this.handleChangeTyp}>
                                    {/* TODO: einbeziehen */}
                                        <option value="quiz">Quiz</option>
                                        <option value="wahrOderFalsch">Wahr oder Falsch</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Zeitlimit">
                                    <select name="" id="dropdown-menu"
                                            value={this.state.value} onChange={this.handleChangeTimelimit}>
                                    {/* TODO: einbeziehen */}
                                        <option value="10">10 Sekunden</option>
                                        <option value="20">20 Sekunden</option>
                                        <option value="30">30 Sekunden</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Punkte">
                                    <select name="" id="dropdown-menu"
                                            value={this.state.value} onChange={this.handleChangePoints}>
                                        {/* TODO: einbeziehen */}
                                        <option value="standard">Standard</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Antwortmöglichkeiten">
                                    <select name="" id="dropdown-menu"
                                            value={this.state.value} onChange={this.handleChangeAnswerOptions}>
                                        {/* TODO: einbeziehen */}
                                        <option value="einzelauswahl">Einzelauswahl</option>
                                        <option value="mehrfachauswahl">Mehrfachauswahl</option>
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