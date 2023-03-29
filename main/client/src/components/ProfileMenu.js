import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popup from '../components/Popup';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Imagebutton from '../components/Imagebutton';
import Text from '../components/Text';
import Field from '../components/Field';
import { toast } from 'react-toastify';
import FileInput from './FileInput';

class ProfileMenu extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            userdata : {}
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

    fileSelectedHandler(event) {
        if(event.target.files[0])
        {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            this.setState({userdata: {user_image: reader.result}})
          });
          reader.readAsDataURL(event.target.files[0]);
        }
      }

    profilAenderungenSpeichern() {
        const valuesToApply = {
            user_name: this.inputFieldEditUserName.current.getValue(),
            user_image: this.state.userdata.user_image
        }

        const password = this.inputFieldPasswor1.current.getValue()
        if (password) {
            if (password === this.inputFieldPasswor2.current.getValue()) {
                valuesToApply.user_password = password;
            } else {
                toast.error("Die Passwörter stimmen nicht überein")
            }
        }
        //Anmerkung: wird ausgeführt auch wenn Passwörter nicht übereinstimmen
        this.setState({userdata: valuesToApply})
        this.updateUserData(valuesToApply)
        this.closePopup("popup-profile")
    }
    
    async fetchUserData() {
        try {
          const res = await fetch("http://193.175.85.52:443/userdata/", {
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
    
          await fetch(`http://193.175.85.52:443/userdata/`, {
            method: "PUT",
            headers: myHeaders, 
            body: JSON.stringify(data),
          });
        } catch (err) {
          console.error(err.message);
        }
    }

    render() {
        return (
            <div>
                <Text
                    id="text-welcome-teacher"
                    value={"Guten Tag, " + this.state.userdata.user_name}>
                </Text>
                <Imagebutton
                    id="profilepicture"
                    src={this.state.userdata.user_image || "/images/profilbild.jpg"}
                    alt="Platzhalter Profilbild"
                    onClick={() => this.openPopup("popup-profile")}>
                </Imagebutton>
                <Field classNameField="body-overlay"/>
                <Popup classNamePopup="popup"
                        idPopup="popup-profile"
                        altImage="button-close Platzhalter"
                        classNameimg="popup-close"
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
                            <FileInput
                                inputId="fileInputProfilbildInsert"
                                labelValue="Profilbild auswählen"
                                inputOnChange={(event) => this.fileSelectedHandler(event)}>  
                            </FileInput>
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
                        <Button
                                    className="button-popup-logout"
                                    value="Abmelden"
                                    href="//193.175.85.52">
                        </Button>    
                    </Popup>
            </div>
        )
    }
}

export default ProfileMenu;