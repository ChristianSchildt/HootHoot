import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import MenuNavigation from '../components/MenuNavigation';
import CreateTile from '../components/CreateTile';
import Field from '../components/Field';
import CourseTile from '../components/CourseTile';
import NewsTile from '../components/NewsTile';
import Popup from '../components/Popup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Imagebutton from '../components/Imagebutton';

class t_HomeMenuPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            courses: [
                {   
                    "id": 1,
                    "name": "Webtechnologien I",
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 2,
                    "name": 'Webtechnologien II',
                    "kalenderwoche": ['kw1', 'kw2']
                },
                {
                    "id": 3,
                    "name": 'IT-Sicherheit',
                    "kalenderwoche": ['kw1']
                },
                {
                    "id": 4,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 5,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 6,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 7,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
                ,
                {
                    "id": 8,
                    "name": 'Betriebssysteme',
                    "kalenderwoche": ['kw1']
                }
            ]
        };
    }
    
    openPopup(idPopup) {
        document.getElementsByClassName("body-overlay")[0].classList.add("sichtbar");
        document.getElementById(idPopup).classList.add("sichtbar");
    }

    closePopup(idPopup) {
        document.getElementsByClassName("body-overlay")[0].classList.remove("sichtbar");
        document.getElementById(idPopup).classList.remove("sichtbar");
    }

    profilAenderungenSpeichern() {
        alert('Aenderungen würden an dieser Stelle gespeichert werden!')
        this.closePopup("popup-profile")
    }
    

    render(){
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
                            <Text
                                id="text-welcome-teacher"
                                value="Guten Tag, Herr Köhn">
                            </Text>
                            <Imagebutton
                                id="profilepicture"
                                src="/images/profilbild.jpg"
                                alt="Platzhalter Profilbild"
                                onClick={() => this.openPopup("popup-profile")}>
                            </Imagebutton>
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
                            <Field classNameField="field"
                                classNameTitle="field-title"
                                valueTitle="Meine Kurse">
                                {this.state.courses.map((course) => (  
                                    <CourseTile key={course.id.toString()} classNameCoursetext="coursetext" valuetext={course.name} /> 
                                ))}
                            </Field>
                            <CreateTile
                                className="createTile">
                            </CreateTile>
                        </Col>
                    </Row>
                    <Field classNameField="body-overlay"/>
                    <Popup classNamePopup="popup"
                        idPopup="popup-profile"
                        altImage="button-close Platzhalter"
                        onClickImage={() => this.closePopup("popup-profile")}
                        srcImage="/images/button_close.png"
                        valueTitle="Profil bearbeiten">
                            {/*TODO: alle benötigten Daten?*/}
                        <Row>
                            <Col>
                                <InputField 
                                    className="inputField-popup"
                                    defaultValue="Köhn">
                                </InputField>    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputField 
                                    className="inputField-popup"
                                    type="password"
                                    placeholder="neues Passwort eingeben">
                                </InputField>    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputField 
                                    className="inputField-popup"
                                    type="password"
                                    placeholder="Passwort bestätigen">
                                </InputField>    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    className="button-popup"
                                    value="Änderungen bestätigen"
                                    onClick={() => this.profilAenderungenSpeichern()}>
                                </Button>    
                            </Col>
                        </Row>
                    </Popup>
                </Container>
            </div>
       );
    }
}

export default t_HomeMenuPage;