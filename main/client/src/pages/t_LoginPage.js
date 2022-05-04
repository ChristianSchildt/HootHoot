import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole.js';
import InputField from '../components/InputField.js';
import Button from '../components/Button.js';

function t_LoginPage(){
    return(
        <div className="tLoginPage">
            <Container fluid>
            <Row>
                {/* Eule einbinden */}
                <Col>
                    <HeaderRole
                        headervalue="HootHoot"
                        rolevalue="- Lehrkraft -">
                    </HeaderRole>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        placeholder="Nachnamen eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        type="password"
                        placeholder="Passwort eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField
                        type="password"
                        placeholder="Passwort erneut eingeben...">
                    </InputField>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-login-loginpage"
                        value="Anmelden"
                        href="/teacher/homeMenu">
                    </Button>
                </Col>
            </Row>
        </Container>
        </div>
        
    );
}

export default t_LoginPage;