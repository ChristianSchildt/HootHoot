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
import cloneDeep from 'lodash/cloneDeep';

class t_CreateHootHootPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

            //Testdaten
            courses : [
                //Leere Daten
                {"courseId": 0,
                "courseName": "",
                "questions": [ 
                    {"id" : 0,
                    "topic": null, //gebraucht?
                    "name": "",
                    "url": "",
                    "type": "quiz",
                    "timelimit": 10,
                    "points": "standard"}],
                "answers": [
                    {id: 0,
                    "answerOptions": "einzelauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["", "", "", ""],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"}]},
                
                //Testkurse
                {"courseId": 1,
                "courseName": "Beispielkurs1",
                "questions": [ 
                    {"id" : 0,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage11",
                    "url": "",
                    "type": "quiz",
                    "timelimit": 10,
                    "points": "standard"},
                    {"id": 1,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage12",
                    "url": null,
                    "type": "wahrOderFalsch",
                    "timelimit": 20,
                    "points": "standard"}],
                "answers": [
                    {id: 0,
                    "answerOptions": "mehrfachauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort111", "Antwort112", "Antwort113", "Antwort114"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"},
                    {id: 1,
                    "answerOptions": "einzelauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort121", "Antwort122", "Antwort123", "Antwort124"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"}]},
                {"courseId": 2,
                "courseName": "Beispielkurs2",
                "questions": [ 
                    {"id" : 0,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage21",
                    "url": "",
                    "type": "quiz",
                    "timelimit": 10,
                    "points": "standard"},
                    {"id": 1,
                    "topic": null, //gebraucht?
                    "name": "Beispielfrage22",
                    "url": null,
                    "type": "wahrOderFalsch",
                    "timelimit": 20,
                    "points": "standard"}],
                "answers": [
                    {id: 0,
                    "answerOptions": "mehrfachauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort211", "Antwort212", "Antwort213", "Antwort214"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"
                    },
                    {id: 1,
                    "answerOptions": "einzelauswahl", //Hier richtig oder zu questions?
                    "answersArray": ["Antwort221", "Antwort222", "Antwort223", "Antwort224"],
                    "isCorrectA": "/images/checkbox_unpressed.jpg",
                    "isCorrectB": "/images/checkbox_unpressed.jpg",
                    "isCorrectC": "/images/checkbox_unpressed.jpg",
                    "isCorrectD": "/images/checkbox_unpressed.jpg"}]}],
            // courses: {},

            //Standardwerte bzw. Werte-Zwischenspeicher
            coursename: "",
            questionname: "",
            image: 0,
            imageData: 0,
            textareaA: "",
            textareaB: "",
            textareaC: "",
            textareaD: "",
            isCorrectA: "/images/checkbox_unpressed.jpg",
            isCorrectB: "/images/checkbox_unpressed.jpg",
            isCorrectC: "/images/checkbox_unpressed.jpg",
            isCorrectD: "/images/checkbox_unpressed.jpg",
            selectType: "quiz",
            selectTimelimit: 10,
            selectPoints: "standard",
            selectAnswerOptions: "einzelauswahl",
            selectedCourseIndex: 0,
            selectedQuestionIndex: 0
        };

        this.handleChangeCourseName = this.handleChangeCourseName.bind(this)
        this.handleChangeCourseIndex = this.handleChangeCourseIndex.bind(this)
        this.handleChangeQuestionname = this.handleChangeQuestionname.bind(this)
        this.handleTextareaAChange = this.handleTextareaAChange.bind(this);
        this.handleTextareaBChange = this.handleTextareaBChange.bind(this);
        this.handleTextareaCChange = this.handleTextareaCChange.bind(this);
        this.handleTextareaDChange = this.handleTextareaDChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeTimelimit = this.handleChangeTimelimit.bind(this);
        this.handleChangePoints = this.handleChangePoints.bind(this);
        this.handleChangeAnswerOptions = this.handleChangeAnswerOptions.bind(this);
    }
    
    pressOrUnpressAnswerCheckbox(idImagebuttonCheckbox) {
        if (idImagebuttonCheckbox === 'answer-checkbox-A') {
            if (this.state.isCorrectA === "/images/checkbox_unpressed.jpg")
            {
                this.setState({isCorrectA: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectA: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-B') {
            if (this.state.isCorrectB === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectB: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectB: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-C') {
            if (this.state.isCorrectC === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectC: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectC: "/images/checkbox_unpressed.jpg"})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-D') {
            if (this.state.isCorrectD === "/images/checkbox_unpressed.jpg") 
            {
                this.setState({isCorrectD: "/images/checkbox_pressed.jpg"})
            }
            else 
            {
                this.setState({isCorrectD: "/images/checkbox_unpressed.jpg"})
            }
        }
    }
    
    addNewQuestion() {  
        let newId = this.state.courses[this.state.selectedCourseIndex].questions.length
        let newquestion = {
            id: newId,
            topic: null, //gebraucht?
            name: "",
            url: "",
            type: "quiz",
            timelimit: 10,
            points: "standard"}
        this.state.courses[this.state.selectedCourseIndex].questions.push(newquestion)

        let newanswers = {
            id: newId,
            answerOptions: "einzelauswahl", //Hier richtig oder zu questions?
            answersArray: ["", "", "", ""],
            isCorrectA: "/images/checkbox_unpressed.jpg",
            isCorrectB: "/images/checkbox_unpressed.jpg",
            isCorrectC: "/images/checkbox_unpressed.jpg",
            isCorrectD: "/images/checkbox_unpressed.jpg"}
        this.state.courses[this.state.selectedCourseIndex].answers.push(newanswers)

        this.setState({courses: this.state.courses})
        console.log(this.state.courses)
    }

    duplicateQuestion(questionId) {
        let questionCopyDeep = cloneDeep(this.state.courses[this.state.selectedCourseIndex].questions[questionId])
        let answersCopyDeep = cloneDeep(this.state.courses[this.state.selectedCourseIndex].answers[questionId])
        this.state.courses[this.state.selectedCourseIndex].questions.splice(questionId+1, 0, questionCopyDeep)
        this.state.courses[this.state.selectedCourseIndex].answers.splice(questionId+1, 0, answersCopyDeep)

        for (let i = 0; i < this.state.courses[this.state.selectedCourseIndex].questions.length; i++) {
            this.state.courses[this.state.selectedCourseIndex].questions[i].id = i
            this.state.courses[this.state.selectedCourseIndex].answers[i].id = i
        }

        this.setState({courses: this.state.courses})
    }

    // TODO:
    //Funktioniert noch nicht
    deleteQuestion(questionId) {
        this.state.courses[this.state.selectedCourseIndex].questions.splice(questionId, 1)
        this.state.courses[this.state.selectedCourseIndex].answers.splice(questionId, 1)

        for (let i = 0; i < this.state.courses[this.state.selectedCourseIndex].questions.length; i++) {
            this.state.courses[this.state.selectedCourseIndex].questions[i].id = i
            this.state.courses[this.state.selectedCourseIndex].answers[i].id = i
        }
        
        this.setState({courses: this.state.courses})
    }

    selectQuestion(questionId) {
        this.setState({selectedQuestionIndex: questionId})
        console.log("Kursindex:"+this.state.selectedCourseIndex+"\nQuestionIndex:"+questionId)
        
        this.setState({questionname: this.state.courses[this.state.selectedCourseIndex].questions[questionId].name})
        this.setState({imageData: this.state.courses[this.state.selectedCourseIndex].questions[questionId].url})
        this.setState({textareaA: this.state.courses[this.state.selectedCourseIndex].answers[questionId].answersArray[0]})
        this.setState({textareaB: this.state.courses[this.state.selectedCourseIndex].answers[questionId].answersArray[1]})
        this.setState({textareaC: this.state.courses[this.state.selectedCourseIndex].answers[questionId].answersArray[2]})
        this.setState({textareaD: this.state.courses[this.state.selectedCourseIndex].answers[questionId].answersArray[3]})
        this.setState({isCorrectA: this.state.courses[this.state.selectedCourseIndex].answers[questionId].isCorrectA})
        this.setState({isCorrectB: this.state.courses[this.state.selectedCourseIndex].answers[questionId].isCorrectB})
        this.setState({isCorrectC: this.state.courses[this.state.selectedCourseIndex].answers[questionId].isCorrectC})
        this.setState({isCorrectD: this.state.courses[this.state.selectedCourseIndex].answers[questionId].isCorrectD})
        this.setState({selectType: this.state.courses[this.state.selectedCourseIndex].questions[questionId].type})
        this.setState({selectTimelimit: this.state.courses[this.state.selectedCourseIndex].questions[questionId].timelimit})
        this.setState({selectPoints: this.state.courses[this.state.selectedCourseIndex].questions[questionId].points})
        this.setState({selectAnswerOptions: this.state.courses[this.state.selectedCourseIndex].answers[questionId].answerOptions})
    }

    saveQuestion() {

        let question = {
                id: this.state.selectedQuestionIndex,
                topic: null,
                name: this.state.questionname,
                url: this.state.imageData,
                type: this.state.selectType,
                timelimit: this.state.selectTimelimit,
                points: this.state.selectPoints}
        
        let answers = {
                id: this.state.selectedQuestionIndex,
                answerOptions: this.state.selectAnswerOptions, //Hier richtig oder zu questions?
                answersArray: [this.state.textareaA,
                                this.state.textareaB, 
                                this.state.textareaC, 
                                this.state.textareaD],
                isCorrectA: this.state.isCorrectA,
                isCorrectB: this.state.isCorrectB,
                isCorrectC: this.state.isCorrectC,
                isCorrectD: this.state.isCorrectD}
        
        this.state.courses[this.state.selectedCourseIndex].courseId = this.state.selectedCourseIndex
        this.state.courses[this.state.selectedCourseIndex].courseName = this.state.coursename
        this.state.courses[this.state.selectedCourseIndex].questions[this.state.selectedQuestionIndex] = question
        this.state.courses[this.state.selectedCourseIndex].answers[this.state.selectedQuestionIndex] = answers

        this.setState({courses: this.state.courses})   
    }

    handleChangeCourseName(changeText) {
        this.setState({coursename: changeText})
    }

    handleChangeQuestionname(changeText) {
        this.setState({questionname: changeText})
    }

    handleChangeCourseIndex(event) {
        this.setState({selectedCourseIndex: event.target.value})
        this.setState({coursename: this.state.courses[event.target.value].courseName})

        //Question-Felder reset
        this.setState({questionname: ""})
        this.setState({imageData: 0})
        this.setState({textareaA: ""})
        this.setState({textareaB: ""})
        this.setState({textareaC: ""})
        this.setState({textareaD: ""})
        this.setState({isCorrectA: "/images/checkbox_unpressed.jpg"})
        this.setState({isCorrectB: "/images/checkbox_unpressed.jpg"})
        this.setState({isCorrectC: "/images/checkbox_unpressed.jpg"})
        this.setState({isCorrectD: "/images/checkbox_unpressed.jpg"})
        this.setState({selectType: "quiz"})
        this.setState({selectTimelimit: 10})
        this.setState({selectPoints: "standard"})
        this.setState({selectAnswerOptions: "einzelauswahl"})
    }

    handleTextareaAChange(changeText) {
        this.setState({textareaA: changeText})
    }

    handleTextareaBChange(changeText) {
        this.setState({textareaB: changeText})
    }

    handleTextareaCChange(changeText) {
        this.setState({textareaC: changeText})
    }

    handleTextareaDChange(changeText) {
        this.setState({textareaD: changeText})
    }

    handleChangeType(event) {
        this.setState({selectType: event.target.value})
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

    setQuestionType(type) {
        if(type === "quiz")
        {
            return (
                <div>
                    <Row>
                        <Col md={6}>
                            <CreateAnswer
                                classNameText="create-answer-letter"
                                valueText="A"
                                classNameInputField="create-answer-InputField"
                                placeholderInputField="Antwort eintippen ..."
                                classNameTextarea="create-answer-textarea"
                                placeholderTextarea="Antwort eintippen ..."
                                valueTextarea={this.state.textareaA}
                                onTextareaChange={this.handleTextareaAChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-A"
                                srcImagebuttonCheckbox= {this.state.isCorrectA}
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
                                valueTextarea={this.state.textareaB}
                                onTextareaChange={this.handleTextareaBChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-B"
                                srcImagebuttonCheckbox= {this.state.isCorrectB}
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
                                valueTextarea={this.state.textareaC}
                                onTextareaChange={this.handleTextareaCChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-C"
                                srcImagebuttonCheckbox= {this.state.isCorrectC}
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
                                valueTextarea={this.state.textareaD}
                                onTextareaChange={this.handleTextareaDChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-D"
                                srcImagebuttonCheckbox= {this.state.isCorrectD}
                                altImagebuttonCheckbox="ImageCheckbox"
                                onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-D")}
                                classNameImagebuttonPicture="create-answer-picture"
                                srcImagebuttonPicture="/images/symbol_picture.png"
                                altImagebuttonPicture="ImagePicture"
                                onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                            </CreateAnswer>
                        </Col>
                    </Row>
                </div> 
            )
        }

        if(type === "wahrOderFalsch")
        {
            return (
                <div>
                    <Row>
                        <Col md={6}>
                            <CreateAnswer
                                classNameText="create-answer-letter"
                                valueText="T"
                                classNameInputField="create-answer-InputField"
                                placeholderInputField="Antwort eintippen ..."
                                classNameTextarea="create-answer-textarea"
                                placeholderTextarea="Antwort eintippen ..."
                                valueTextarea={this.state.textareaA}
                                onTextareaChange={this.handleTextareaAChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-A"
                                srcImagebuttonCheckbox= {this.state.isCorrectA}
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
                                valueText="W"
                                classNameInputField="create-answer-InputField"
                                placeholderInputField="Antwort eintippen ..."
                                classNameTextarea="create-answer-textarea"
                                placeholderTextarea="Antwort eintippen ..."
                                valueTextarea={this.state.textareaB}
                                onTextareaChange={this.handleTextareaBChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-B"
                                srcImagebuttonCheckbox= {this.state.isCorrectB}
                                altImagebuttonCheckbox="ImageCheckbox"
                                onClickImagebuttonCheckbox={() => this.pressOrUnpressAnswerCheckbox("answer-checkbox-B")}
                                classNameImagebuttonPicture="create-answer-picture"
                                srcImagebuttonPicture="/images/symbol_picture.png"
                                altImagebuttonPicture="ImagePicture"
                                onClickImagebuttonPicture={() => alert('TODO: Hier wird man ein Bild als Antwort setzen können')}>
                            </CreateAnswer>
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    loadQuestionView() {
        return (
            <div>
                {this.state.courses[this.state.selectedCourseIndex].questions.map((question) => (  
                    <QuestionView
                        key={question.id.toString()}
                        classNameImagebuttonDuplicate="question-view-duplicate"
                        srcImagebuttonDuplicate="/images/duplicate.jpg"
                        altImagebuttonDuplicate="duplicateButton"
                        onClickImagebuttonDuplicate={() => this.duplicateQuestion(question.id)}
                        classNameImagebuttonDelete="question-view-delete"
                        srcImagebuttonDelete="/images/delete.jpg"
                        altImagebuttonDelete="deleteButton"
                        onClickImagebuttonDelete={() => this.deleteQuestion(question.id)}
                        classNameText="question-overview-text" 
                        valueText={question.name}
                        classNameQuestionSelectionButton="question-selection-button"
                        onClickQuestionSelectionButton={() => this.selectQuestion(question.id)}>
                        {/* TODO: Duplicate- und Delete-Button, 
                        können auch außerhalb der Optik geklickt werden?! -> ändern */}
                    </QuestionView>
                ))}
            </div>
        )
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
                                defaultValue={this.state.coursename}
                                onChange={this.handleChangeCourseName}>
                            </InputField>
                        </Col>
                        <Col md={4}>
                            <select name="" id="dropdown-menu-course"
                                    value={this.state.selectedCourseIndex}
                                    onChange={this.handleChangeCourseIndex}>
                                {/* TODO: einbeziehen */}
                                {this.state.courses.map((course) => (
                                    <option key={course.courseId} value={course.courseId}>{course.courseName}</option>
                                ))}
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
                                {this.loadQuestionView()}
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
                                defaultValue={this.state.questionname}
                                onChange={this.handleChangeQuestionname}>
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
                            {this.setQuestionType(this.state.selectType)}
                        </Col>
                        <Col md={2}>
                            <Field
                                idField="question-options">
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Fragentyp">
                                    <select name="" id="dropdown-menu" 
                                            value={this.state.selectType} 
                                            onChange={this.handleChangeType}>
                                    {/* TODO: einbeziehen */}
                                        <option value="quiz">Quiz</option>
                                        <option value="wahrOderFalsch">Wahr oder Falsch</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Zeitlimit">
                                    <select name="" id="dropdown-menu"
                                            value={this.state.selectTimelimit} 
                                            onChange={this.handleChangeTimelimit}>
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
                                            value={this.state.selectPoints} 
                                            onChange={this.handleChangePoints}>
                                        {/* TODO: einbeziehen */}
                                        <option value="standard">Standard</option>
                                    </select>
                                </QuestionOption>
                                <QuestionOption
                                    classNameText="question-option-text"
                                    valueText="Antwortmöglichkeiten">
                                    <select name="" id="dropdown-menu"
                                            value={this.state.selectAnswerOptions} 
                                            onChange={this.handleChangeAnswerOptions}>
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