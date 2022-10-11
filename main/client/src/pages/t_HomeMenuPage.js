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
import { toast } from 'react-toastify';

class t_HomeMenuPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdata : {},
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
        this.inputFieldEditUserName = React.createRef();
        this.inputFieldPasswor1 = React.createRef();
        this.inputFieldPasswor2 = React.createRef();
    }
    
    componentDidMount() {
        this.fetchUserData();
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
        const valuesToApply = {
            user_name: this.inputFieldEditUserName.current.getValue()
        }

        const password = this.inputFieldPasswor1.current.getValue()
        if (password) {
            if (pw === this.inputFieldPasswor2.current.getValue()) {
                valuesToApply.user_password = password;
            } else {
                toast.error("Die Passwörter stimmen nicht überein")
            }
        }
        
        this.setState({userdata: valuesToApply})
        this.updateUserData(valuesToApply)
        this.closePopup("popup-profile")
    }
    
    async fetchUserData() {
        try {
          const res = await fetch("http://localhost:5000/userdata/", {
            method: "GET",
            headers: { jwt_token: localStorage.token },
          });  

          const parseData = await res.json()
          this.setState({userdata: parseData[0]})

          return parseData;
        } catch (err) {
          console.error(err.message);
        }
    };

    async updateUserData(data) {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("jwt_token", localStorage.token);
    
          await fetch(`http://localhost:5000/userdata/`, {
            method: "PUT",
            headers: myHeaders, 
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error(err.message);
        }
    };

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
                                value={"Guten Tag, Herr " + this.state.userdata.user_name}>
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
                                    <CourseTile 
                                        key={course.id.toString()} 
                                        //TODO: Kursbild aus DB einfügen
                                        srcPicture=""
                                        valuetext={course.name}>
                                    </CourseTile>
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
                                    ref={this.inputFieldEditUserName}
                                    className="inputField-popup"
                                    defaultValue={this.state.userdata.user_name}>
                                </InputField>    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputField 
                                    ref={this.inputFieldPasswor1}
                                    className="inputField-popup"
                                    type="password"
                                    placeholder="neues Passwort eingeben">
                                </InputField>    
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputField 
                                    ref={this.inputFieldPasswor2}
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