import React from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole';
import InputField from '../components/InputField.js';
import Button from '../components/Button';



function s_LandingPage(){
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
                        placeholder="Spiel-Pin eintippen...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
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
                        href="/student/answerselectionMinimalist">
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default s_LandingPage;