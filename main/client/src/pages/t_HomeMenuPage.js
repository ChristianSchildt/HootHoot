import React, { useRef, useState, useEffect, createRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import Field from '../components/Field';
import CourseTile from '../components/CourseTile';
import NewsTile from '../components/NewsTile';
import ProfileMenu from '../components/ProfileMenu';
import Button from '../components/Button';
import PopupCourse from '../components/PopupCourse';
import InputField from '../components/InputField'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


function t_HomeMenuPage(){

    const [courses, setCourses] = useState([]);
    const inputKursname = useRef(null);

    async function deleteCourse(id) {
        try{
            await fetch(`http://localhost:5000/api/courses/${id}`, {
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
            const response = await fetch('http://localhost:5000/api/courses', {
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
    
    useEffect(() => {
        console.log("useeffect löst aus")
        getCourses();
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
            const response = await fetch('http://localhost:5000/api/courses/', { 
    
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
                            id1="mark-home">
                        </MenuNavigation>
                    </Col>
                    <Col md={{ span: 2, offset: 1}}>
                        <ProfileMenu/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Field classNameField="field"
                            classNameTitle="field-title"
                            valueTitle="Neuigkeiten">
                            <NewsTile classNameNewstext="newstext" valuetext="Willkommen bei HootHoot:)"/>
                            <NewsTile classNameNewstext="newstext" valuetext="Du hast ein neues HootHoot erstellt!"/>
                        </Field>
                    </Col>
                    <Col>
                        <Field
                            id="tiles" 
                            classNameField="field"
                            classNameTitle="field-title"
                            valueTitle="Meine Kurse"
                            >    
                            {(courses.map((course) => {
                                return (
                                //img statt x
                                <div>
                                    <span onClick={() => submit(course.id)} style={{marginLeft:"10px", color:"red", cursor:"pointer"}}>x</span>
                                    <CourseTile 
                                        key={course.id} 
                                        srcPicture=""
                                        valuetext={course.name}>
                                    </CourseTile>
                            
                                </div>
                            );
                            }))}
                        </Field>
                        <div className={"createTile"}>
                        <Container fluid>
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
                                        onClick={()=>openPopup("popup-profile2")}
                                        >
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
                            </div>
                                </Col>
                </Row>
                        
            </Container>
        </div>
    );
}


export default t_HomeMenuPage;