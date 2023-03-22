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
            
            courses: [{}],
            questions: [{}],
            answers: [{}],
            
            //Standardwerte bzw. Werte-Zwischenspeicher
            selectedCourseId: null,
            coursename: "",
            selectedQuestionId: null,
            questionname: "",
            image: 0,
            imageData: 0,
            textareaA: "",
            textareaB: "",
            textareaC: "",
            textareaD: "",
            isCorrectA: false,
            isCorrectB: false,
            isCorrectC: false,
            isCorrectD: false,
            selectType: "quiz",
            selectTimelimit: 10,
            selectPoints: "standard",
            selectAnswerOptions: "einzelauswahl",
        };

        this.handleChangeCourseName = this.handleChangeCourseName.bind(this)
        this.handleChangeCourseId = this.handleChangeCourseId.bind(this)
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

    async componentDidMount() {
        await this.getCourses()
        this.handleChangeCourseId()

    }

    /*componentDidUpdate(prevProps, prevState) {

        //Änderung an QuestionProperties stattgefunden?
        if(prevState.questions !== this.state.questions) {
            this.showQuestions()
        }

        //Änderung an AnswersProperties stattgefunden?
        if((prevState.textareaA !== this.state.textareaA) || (prevState.textareaB !== this.state.textareaB) || 
           (prevState.textareaC !== this.state.textareaC) || (prevState.textareaD !== this.state.textareaD)) {
            console.log('Textarea A innerhalb: '+this.state.textareaA)
            console.log('Textarea B innerhalb: '+this.state.textareaB)
            this.showAnswers(this.state.selectType)
            console.warn('update')
            // console.log(this.answerCheckboxTranslatorBToS(true//this.state.isCorrectA
            ))
            // console.log('isCorrectA: '+this.state.isCorrectA)
            // console.log('isCorrectB: '+this.state.isCorrectB)
            // console.log('isCorrectC: '+this.state.isCorrectC)
            // console.log('isCorrectD: '+this.state.isCorrectD)
        }
        
    }*/

    //GET-------------
    async getCourses() {
        try {
            const response = await fetch('http://193.175.85.52:443/api/courses', {
                method: 'GET',
                headers: { 'jwt_token': localStorage.token }
            });
            
            const data = await response.json()
            this.setState({courses: data})
            
        } catch (e) {
            console.log(e)
        }
    }

    async getQuestionsFromSelectedCourse(courseid) {
        try {

            if(typeof courseid === 'undefined')
            {
                courseid = this.state.selectedCourseId
            }

            const response = await fetch('http://193.175.85.52:443/api/courses/'+courseid+'/questions');
            const data = await response.json()
            
            this.setState({questions: data})
            //console.log("Questions:")
            //console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    async getAnswersAndSet(questionid) {
        try {
            if (questionid !== 1) {
            const response = await fetch('http://193.175.85.52:443/api/answers/'+questionid);
            const data = await response.json()
            this.setState({answers: data})
            console.log("Answers:")
            console.log(this.state.answers)

            //map: nicht anwenden, Ausgabe erst in nächster Runde verfügbar
            
            this.setState({textareaA: data[0].answer})
            this.setState({isCorrectA: data[0].iscorrect})
                  
            this.setState({textareaB: data[1].answer})
            this.setState({isCorrectB: data[1].iscorrect})
            
            // if (this.state.selectType === "quiz"): auch unsicher ob Ausgabe

            this.setState({textareaC: data[2].answer})
            this.setState({isCorrectC: data[2].iscorrect})
                        
            this.setState({textareaD: data[3].answer})
            this.setState({isCorrectD: data[3].iscorrect})

            } else {

                //if(this.state.answers.length === 0) {
                    this.setState({textareaA: ""})
                    this.setState({isCorrectA: false})
        
                    this.setState({textareaB: ""})
                    this.setState({isCorrectB: false})
        
                    this.setState({textareaC: ""})
                    this.setState({isCorrectC: false})
        
                    this.setState({textareaD: ""})
                    this.setState({isCorrectD: false})
        
                //}
            }
        
            console.log('setAnswers finish')
        
        } catch(e) {
            console.log(e)
        }
    }

    //POST---------------
    async createQuestion() {
        try {

            let body = {
                name: this.state.questionname,
                type: this.state.selectType,
                timelimit: this.state.selectTimelimit,
                points: this.state.selectPoints,
                answer_options: this.state.selectAnswerOptions,
                courseid: this.state.selectedCourseId
            }
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token);
            
            const response = await fetch('http://193.175.85.52:443/api/question/', { 
                method: 'POST', 
                headers: myHeaders, 
                body: JSON.stringify(body)
            });
            
            const data = await response.json()
            console.log("createQuestionResponse:")
            console.log(data)
            
            console.log("post Questionid:")
            console.log(data.data.questionid)
            this.setState({selectedQuestionId: data.data.questionid})

            await this.getQuestionsFromSelectedCourse(this.state.selectedCourseId)
            
            //console.log("createQuestion->selectedQuestionId: "+this.state.selectedQuestionId)
            
        } catch (e) {
            console.log(e)
        }
    }

    async createAnswers() {
        try {
            //console.log('setState selectedQuestionId finished')
            
            //console.log('getQuestions')
            //console.log(this.state.questions)
            //id umwandeln
            
            //console.log('createAnswer->selectedQuestionId: '+this.state.selectedQuestionId)
            console.log("createAnswers->selectedQuestionId: "+this.state.selectedQuestionId)
            //first answer
            let body1 = {
                    questionid: this.state.selectedQuestionId,
                    answer: this.state.textareaA,
                    iscorrect: this.state.isCorrectA
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token);
    
            const response1 = await fetch('http://193.175.85.52:443/api/answer/', {
                method: 'POST', 
                headers: myHeaders, 
                body: JSON.stringify(body1)
            })

            console.log(response1)
            

            //second answer
            let body2 = {
                    questionid: this.state.selectedQuestionId,
                    answer: this.state.textareaB,
                    iscorrect: this.state.isCorrectB
            }

            const response2 = await fetch('http://193.175.85.52:443/api/answer/', {
                method: 'POST', 
                headers: myHeaders, 
                body: JSON.stringify(body2)
            })

            console.log(response2)
            
            if (this.state.selectType === "quiz") {
                //third answer
                let body3 = {
                        questionid: this.state.selectedQuestionId,
                        answer: this.state.textareaC,
                        iscorrect: this.state.isCorrectC
                }

                const response3 = await fetch('http://193.175.85.52:443/api/answer/', {
                    method: 'POST', 
                    headers: myHeaders, 
                    body: JSON.stringify(body3)
                })

                console.log(response3)
                
                
                //fourth answer
                let body4 = {
                        questionid: this.state.selectedQuestionId,
                        answer: this.state.textareaD,
                        iscorrect: this.state.isCorrectD
                    }

                const response4 = await fetch('http://193.175.85.52:443/api/answer/', {
                    method: 'POST', 
                    headers: myHeaders, 
                    body: JSON.stringify(body4)
                })
            
                console.log(response4)
            }

            await this.getAnswersAndSet(this.state.selectedQuestionId)

        } catch (e) {
            console.log(e)
        }
    }

    //PUT
    /*async updateQuestion() {

    }*/

    /*async updateAnswer() {

    }*/


    //DELETE---------------
    async deleteQuestion(id) {
        
        console.log("löschen questionid: "+id)
        
        if (id !== 1) {
            await fetch('http://193.175.85.52:443/api/questions/'+id, {
                method: 'DELETE'
            })
        
            this.getQuestionsFromSelectedCourse(this.state.selectedCourseId)
        }
        else {
            console.log("gelöschte Question: ")
            console.log(this.state.questions.pop())
            this.setState({questions: this.state.questions})
        }
    }

    async deleteAnswers(questionid) {
        if (questionid !== 1) {
            await fetch('http://193.175.85.52:443/api/questions/'+ questionid +'/answers/', {
                method: 'DELETE'
            })
        } else {
            this.setState({answers: this.state.answers = [{}]})
        }

    }

    //DUPLICATE
    /*async duplicateQuestion() {

    }*/

    /*async duplicateAnswer() {

    }*/


    answerCheckboxTranslatorBToS(pressedUnpressed) {
        //Boolean to String
        if(pressedUnpressed === true) {
            return "/images/checkbox_pressed.jpg"
        }
        else {
            return "/images/checkbox_unpressed.jpg"
        }
    }
    
    pressOrUnpressAnswerCheckbox(idImagebuttonCheckbox) {
        if (idImagebuttonCheckbox === 'answer-checkbox-A') {
            if (this.state.isCorrectA === false)
            {
                this.setState({isCorrectA: true})
            }
            else 
            {
                this.setState({isCorrectA: false})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-B') {
            if (this.state.isCorrectB === false) 
            {
                this.setState({isCorrectB: true})
            }
            else 
            {
                this.setState({isCorrectB: false})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-C') {
            if (this.state.isCorrectC === false) 
            {
                this.setState({isCorrectC: true})
            }
            else 
            {
                this.setState({isCorrectC: false})
            }
        }
        
        if (idImagebuttonCheckbox === 'answer-checkbox-D') {
            if (this.state.isCorrectD === false) 
            {
                this.setState({isCorrectD: true})
            }
            else 
            {
                this.setState({isCorrectD: false})
            }
        }
    }
    
    addNewQuestion() {  

        let newQuestion = {
            id: 1,
            topic: null, //gebraucht?
            name: "",
            url: "",
            type: "quiz",
            timelimit: 10,
            points: "standard",
            answerOptions: "mehrfachauswahl"}

        this.state.questions.push(newQuestion)
        this.setState({questions: this.state.questions})
        // console.log(this.state.questions)

        let newAnswerA = {
            answer: "",
            isCorrect: false,
            questionid: 1}
        this.state.answers.push(newAnswerA)

        let newAnswerB = {
            answer: "",
            isCorrect: false,
            questionid: 1}
        this.state.answers.push(newAnswerB)

        let newAnswerC = {
            answer: "",
            isCorrect: false,
            questionid: 1}
        this.state.answers.push(newAnswerC)

        let newAnswerD = {
            answer: "",
            isCorrect: false,
            questionid: 1}
        this.state.answers.push(newAnswerD)
        this.setState({answers: this.state.answers})

        
        this.setState({questionname: ""})
        this.setState({textareaA: ""})
        this.setState({isCorrectA: false})
        
        this.setState({textareaB: ""})
        this.setState({isCorrectB: false})
        
        this.setState({textareaC: ""})
        this.setState({isCorrectC: false})
        
        this.setState({textareaD: ""})
        this.setState({isCorrectD: false})
    }

    //TODO: löschen, doppelt?
    /*duplicateQuestion(questionId) {
        let questionCopyDeep = cloneDeep(this.state.courses[this.state.selectedCourseId].questions[questionId])
        let answersCopyDeep = cloneDeep(this.state.courses[this.state.selectedCourseId].answers[questionId])
        this.state.courses[this.state.selectedCourseId].questions.splice(questionId+1, 0, questionCopyDeep)
        this.state.courses[this.state.selectedCourseId].answers.splice(questionId+1, 0, answersCopyDeep)

        for (let i = 0; i < this.state.courses[this.state.selectedCourseId].questions.length; i++) {
            this.state.courses[this.state.selectedCourseId].questions[i].id = i
            this.state.courses[this.state.selectedCourseId].answers[i].id = i
        }

        this.setState({courses: this.state.courses})
    }*/

    async deleteQuestionAndAnswers(questionid) {
        
        await this.deleteAnswers(questionid)
        await this.deleteQuestion(questionid)

        //Felder resetten
        this.setState({questionname: ""})
        this.setState({textareaA: ""})
        this.setState({isCorrectA: false})
        
        this.setState({textareaB: ""})
        this.setState({isCorrectB: false})
        
        this.setState({textareaC: ""})
        this.setState({isCorrectC: false})
        
        this.setState({textareaD: ""})
        this.setState({isCorrectD: false})

    }

    setQuestionProperties(questionId) {
        {this.state.questions.map((question) => {
            if(question.id === questionId) {
                this.setState({questionname: question.name})
                this.setState({selectType: question.type})
                this.setState({selectTimelimit: question.timelimit})
                this.setState({selectPoints: question.points})
                this.setState({selectAnswerOptions: question.answer_options})
            }
        })}
    }

    setAnswerProperties() {
        
    }

    async selectQuestion(questionId) {

        console.log("questionid: "+questionId)
        
        this.setState({selectedQuestionId: questionId})
        
        await this.getAnswersAndSet(questionId)
        this.setQuestionProperties(questionId)
        
        console.log("Questions:")
        console.log(this.state.questions)
        console.log("AnswerIds: ")
        console.log(this.state.answers)

        //this.setState({imageData: this.state.courses[this.state.selectedCourseId].questions[questionId].url})   
    }

    checkIsCorrect() {

        var counter = 0
        
        if(this.state.isCorrectA === true) {
            counter +=1
        }
        if(this.state.isCorrectB === true) {
            counter +=1
        }
        if(this.state.isCorrectC === true) {
            counter +=1
        }
        if(this.state.isCorrectD === true) {
            counter +=1
        }
        
        if(this.state.selectAnswerOptions === 'einzelauswahl') {
            if(counter === 1) {
                return true
            }
            else {
                return false
            }
        }
        
        if(this.state.selectAnswerOptions === 'mehrfachauswahl') {
            if(counter > 1) {
                return true
            }
            else {
                return false
            }
        }
    }

    async saveQuestion() {

        if(this.checkIsCorrect()) {
            
            await this.createQuestion()
            await this.createAnswers()
            console.log('Alles abgespeichert') 

        }
        else {
            alert('isCorrect passt nicht zum Fragentypen')
        }
          
    }

    handleChangeCourseName(changeText) {
        this.setState({coursename: changeText})
    }

    handleChangeQuestionname(changeText) {
        this.setState({questionname: changeText})
    }

    async handleChangeCourseId(event) {
        try {
            let courseid = null

            if(typeof event === 'undefined') {
                courseid = this.state.courses[0].id
            } else {
                courseid = event.target.value
            }
            this.setState({selectedCourseId: courseid})

            console.log('Courseid: '+courseid)
            
            {this.state.courses.map((course) => {
                if(course.id === courseid) {
                    this.setState({coursename: course.name})
                }
            })}
            
            await this.getQuestionsFromSelectedCourse(courseid)

            //Question-Felder reset
            this.setState({questionname: ""})
            this.setState({imageData: 0})
            this.setState({textareaA: ""})
            this.setState({textareaB: ""})
            this.setState({textareaC: ""})
            this.setState({textareaD: ""})
            this.setState({isCorrectA: false})
            this.setState({isCorrectB: false})
            this.setState({isCorrectC: false})
            this.setState({isCorrectD: false})
            this.setState({selectType: "quiz"})
            this.setState({selectTimelimit: 10})
            this.setState({selectPoints: "standard"})
            this.setState({selectAnswerOptions: "einzelauswahl"})

            console.log('Kurs ausgewählt: '+this.state.coursename)
            console.log('selectedCourseId: '+this.state.selectedCourseId)
        } catch (e) {
            console.log(e)
        }
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
        
        if(event.target.value === "wahrOderFalsch") {
            this.setState({selectAnswerOptions: "einzelauswahl"})
        }
    }

    handleChangeTimelimit(event) {
        this.setState({selectTimelimit: event.target.value})
    }

    handleChangePoints(event) {
        this.setState({selectPoints: event.target.value})
    }
    
    handleChangeAnswerOptions(event) {
        if(this.state.selectType === "wahrOderFalsch") {
            this.setState({selectAnswerOptions: "einzelauswahl"})
        }
        else {
            this.setState({selectAnswerOptions: event.target.value})
        }
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

    showAnswers(type) {

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
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectA)}
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
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectB)}
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
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectC)}
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
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectD)}
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
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectA)}
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
                                valueText="F"
                                classNameInputField="create-answer-InputField"
                                placeholderInputField="Antwort eintippen ..."
                                classNameTextarea="create-answer-textarea"
                                placeholderTextarea="Antwort eintippen ..."
                                valueTextarea={this.state.textareaB}
                                onTextareaChange={this.handleTextareaBChange}
                                classNameImagebuttonCheckbox="create-answer-checkbox"
                                idImagebuttonCheckbox="answer-checkbox-B"
                                srcImagebuttonCheckbox= {this.answerCheckboxTranslatorBToS(this.state.isCorrectB)}
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

    showQuestions() {
        return (
            <div>
                {this.state.questions.map((question) => (  
                    <QuestionView
                        key={question.id}
                        //-----kein Duplizieren möglich, deswegen auskommentiert
                        // classNameImagebuttonDuplicate="question-view-duplicate"
                        // srcImagebuttonDuplicate="/images/duplicate.jpg"
                        // altImagebuttonDuplicate="duplicateButton"
                        // onClickImagebuttonDuplicate={() => this.duplicateQuestion(question.id)}
                        classNameImagebuttonDelete="question-view-delete"
                        srcImagebuttonDelete="/images/delete.jpg"
                        altImagebuttonDelete="deleteButton"
                        onClickImagebuttonDelete={() => this.deleteQuestionAndAnswers(question.id)}
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
                                    value={this.state.selectedCourseId}
                                    onChange={this.handleChangeCourseId}>
                                {/* TODO: einbeziehen */}
                                {this.state.courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </Col>
                        <Col md={2}>
                            <Imagebutton
                                id="button-save"
                                src="/images/save.jpg"
                                alt="save-Symbol"
                                onClick={() => this.saveQuestion(this.state.selectedQuestionId)}>
                            </Imagebutton>
                            <Imagebutton
                                id="button-exit"
                                src="/images/exit.jpg"
                                alt="exit-Symbol"
                                href="/teacher/libraryMenu">
                            </Imagebutton>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Field idField="question-overview">
                                {this.showQuestions()}
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
                            {this.showAnswers(this.state.selectType)}
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