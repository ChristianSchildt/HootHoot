import React, { useRef, useEffect } from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole';
import InputField from '../components/InputField.js';
import Button from '../components/Button';

function s_LandingPage(){
    const inputName = useRef(null);
    const inputPin = useRef(null);

    const enterSession = async e => {
        // TODO: better input validation and feedback for user
        window.connection.socket.emit('player-join', { gamepin: inputPin.current.getValue(), name: inputName.current.getValue() }, (response) => {
            console.log(response);
            if (response.status === "OK") {
                window.location.href = "/student/answerselectionMinimalist";
            }
        });
    };

    useEffect(() => {
        window.connection.connect();
    },[])

    return(
        <div className="s_LandingPage">
        <Container fluid>
            <Row>
                <Col>
                {/* TODO: Eule einbinden */}
                    <HeaderRole
                        headervalue="Willkommen auf HootHoot"
                        rolevalue="- Student -">
                    </HeaderRole>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        ref={inputPin}
                        className="inputField"
                        placeholder="Spiel-Pin eintippen...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        ref={inputName}
                        className="inputField"
                        placeholder="Matrikelnummer eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button_answermin"
                        value="Beitreten"
                        onClick={enterSession}>
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default s_LandingPage;