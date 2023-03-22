import React, { useRef, useState, useEffect, createRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Imagebutton from '../components/Imagebutton';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import QuestionTile from '../components/QuestionTile';
import ProfileMenu from '../components/ProfileMenu';
import Button from '../components/Button';
import PopupCourse from '../components/PopupCourse';
import InputField from '../components/InputField'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useNavigate } from 'react-router-dom'; 

function T_HomeMenuPage() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const inputKursname = useRef(null);

    //TODO
    var options = []
    var checkboxIsSelected= []

    questions.map((question) => {
        options.push(question.id)
    })

    checkboxIsSelected = options.reduce(
        (options, option) => ({
            ...options,
            [option]: false
        }),
        {}
    )

    function handleCheckboxChange(checkboxid) {
        checkboxIsSelected[checkboxid] = !checkboxIsSelected[checkboxid]
        // console.log(checkboxid+ ": "+ checkboxIsSelected[checkboxid])
    }

    async function submitHootHoots() {
        // alert('submitHootHoots')
        // console.log('QUESTIONS:')
        // console.log(questions)
        // console.log('OPTIONS:')
        // console.log(options)
        // console.log('CHECKBOXES:')
        // console.log(checkboxIsSelected)

        let sessionQuestions = []
        Object.entries(checkboxIsSelected).map(([key, value]) => {
            if(value == true) {
                questions.map((question) => {
                    if(question.id == key) {
                        sessionQuestions.push(question)
                    }
                })
            } 
        })

        //Questions für die Session
        console.log('SESSIONQUESTIONS:')
        console.log(sessionQuestions)

        // we prepare all questions here for the game session and send it to the backend later, because via
        // the REST routes we have security mechanisms that verify, that the requested data is owned by the user.
        let preparedQuestions = [];
        for (let question of sessionQuestions) {
            let preparedQuestion = {};
            preparedQuestion.id = question.id;
            preparedQuestion.time = question.timelimit;
            preparedQuestion.question = question.name;
            preparedQuestion.answers = [];
            preparedQuestion.answerIds = [];
            preparedQuestion.correctAnswerIndex = null;

            const response = await fetch('http://localhost:443/api/answers/'+ question.id);
            const data = await response.json();
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                preparedQuestion.answers.push(element.answer);
                preparedQuestion.answerIds.push(element.id);
                if (element.iscorrect) {
                    preparedQuestion.correctAnswerIndex = index;
                }
            }

            console.assert(preparedQuestion.correctAnswerIndex != null)
            preparedQuestions.push(preparedQuestion)
        }

        console.log('PREPAREDQUESTIONS:')
        console.log(preparedQuestions)

        navigate("/teacher/letStudentsJoin", {state: {questions: preparedQuestions, continueGame: false}});
    }

    async function deleteCourse(id) {
        try{
            await fetch(`http://localhost:443/api/courses/${id}`, {
                method: "DELETE",
                headers: { "jwt_token": localStorage.token }
            });
            getCourses();
        }catch(e){
            console.log(e);
        }
    }

    const getCourses = async () => {
        try{
            const response = await fetch('http://localhost:443/api/courses', {
            method: "GET",
            headers: { "jwt_token": localStorage.token }
        })
            const data = await response.json();
            setCourses(data);
            console.log(courses);
        
        }catch(e){
            console.log(e);
        }
    }

    const getQuestions = async () => {
        try{
            const response = await fetch('http://localhost:443/api/user/questions', {
            method: "GET",
            headers: { "jwt_token": localStorage.token }
            })

            const data = await response.json()
            setQuestions(data)

        } catch(e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        // getCourses();
        getQuestions()
    },[])
    
    
    function submit(id){
        confirmAlert({
          title: 'Kurs Löschen',
          message: 'Soll der Kurs wirklich gelöscht werden?',
          buttons: [
            {
              label: 'Ja',
              onClick: () => deleteCourse(id)
            },
            {
              label: 'Nein',
              onClick: () => getCourses()
            }
          ]
        });
      };
    
    function openPopup(idPopup) {
        document.getElementsByClassName("body-overlay2")[0].classList.add("sichtbar");
        document.getElementById(idPopup).classList.add("sichtbar");
    }

    function closePopup(idPopup) {
        document.getElementsByClassName("body-overlay2")[0].classList.remove("sichtbar");
        document.getElementById(idPopup).classList.remove("sichtbar");
    }

    async function createCourse() {
        try{
            let body = {name: inputKursname.current.getValue()};
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt_token", localStorage.token);
            const response = await fetch('http://localhost:443/api/courses/', { 
    
                method: 'POST', 
                headers: myHeaders, 
                body: JSON.stringify(body)
        
            });
            getCourses();
            closePopup("popup-profile2");

        }catch(e) {
            console.log(e);
        }
    }  

    return(
        
        <div className = "tHomeMenuPage">
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
                    <Col md={7}>
                        <MenuNavigation 
                            className="menu-navigation"
                            id1="mark">
                        </MenuNavigation>
                    </Col>
                    <Col md={{ span: 2, offset: 1}}>
                        <ProfileMenu/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    {/* <Col>
                        <Field classNameField="field"
                            classNameTitle="field-title"
                            valueTitle="Neuigkeiten">
                            <NewsTile classNameNewstext="newstext" valuetext="Willkommen bei HootHoot:)"/>
                            <NewsTile classNameNewstext="newstext" valuetext="Du hast ein neues HootHoot erstellt!"/>
                        </Field>
                    </Col> */}
                    
                    <Col md={2}>
                            <Container fluid className={'createTile'}>
                                <Row>
                                    <Col>
                                        <Text
                                            id="createTile-header"
                                            value="Erstellen">
                                        </Text>
                                    </Col>
                                </Row>
                                <div className="div-createTile">
                                    <Row>
                                        <Col>
                                            <Text
                                                className="createTile-text"
                                                // TODO: Values auslagern
                                                value="Kurs">
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Picture
                                                className="symbol-add"
                                                src="/images/add.png"
                                                alt="Plus"
                                                variant="outlined"
                                                onClick={()=>openPopup("popup-profile2")}>
                                            </Picture>
                                            <Field classNameField="body-overlay2"/>
                                            <PopupCourse classNamePopup="popup"
                                                idPopup="popup-profile2"
                                                altImage="button-close Platzhalter"
                                                onClickImage={() =>closePopup("popup-profile2")}
                                                srcImage="/images/button_close.png"
                                                valueTitle="Neuen Kurs erstellen">
                                                <Row>
                                                    <Col>
                                                        <Text
                                                            className="createTile-text"
                                                            value="Wie soll der neue Kurs heißen?">
                                                        </Text>
                                                    </Col>
                                                    <Col>
                                                        <InputField 
                                                            ref={inputKursname}
                                                            className="inputField-popup"
                                                            placeholder="Kursname">
                                                        </InputField>    
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            className="button-popup"
                                                            value="Erstellen"
                                                            onClick={()=>createCourse()}>
                                                        </Button>    
                                                    </Col>
                                                </Row>
                                            </PopupCourse>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="div-createTile">
                                    <Row>
                                        <Col>
                                            <Text
                                                className="createTile-text"
                                                value="HootHoot">
                                            </Text>
                                        </Col>
                                        <Col>
                                            <Picture
                                                className="symbol-add"
                                                src="/images/add.png"
                                                alt="Plus"
                                                variant="outlined"
                                                onClick={() => window.location.href = "/teacher/createHootHoot"}>
                                            </Picture>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                    </Col>    
                </Row>
                <Row className="justify-content-md-center">
                <Col>
                    <Field
                            classNameField="field-hoothoots"
                            classNameTitle="field-title"
                            valueTitle="HootHoots">                                                        
                                    <Imagebutton
                                        className="button-coursePlay"
                                        src="/images/play.jpg"  
                                        alt="Play Symbol"
                                        onClick={() => submitHootHoots()}>
                                    </Imagebutton>                     
                                    <div id='select-hoothoots'>
                                        {(questions.map((question, i) => {
                                            return (
                                                <div>
                                                    <QuestionTile
                                                        labelCheckbox={question.id}
                                                        isSelectedCheckbox={checkboxIsSelected[i+1]} //TODO
                                                        onCheckboxChange={handleCheckboxChange} //TODO
                                                        key={question.id}
                                                        valuetext={question.name}>
                                                    </QuestionTile>
                                                </div>
                                            );
                                        }))}
                                    </div>
                        </Field>
                    </Col>  
                </Row>       
            </Container>
        </div>
    );
}


export default T_HomeMenuPage;