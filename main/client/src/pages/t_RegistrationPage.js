import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole.js';
import InputField from '../components/InputField.js';
import Button from '../components/Button.js';

function t_RegistrationPage() {
    return (
        <div className="tRegistrationPage">
            <Container fluid>
                <Row>
                    <Col>
                        {/* Eule einbinden */}
                        <HeaderRole
                            headervalue="HootHoot"
                            rolevalue="- Lehrkraft -">
                        </HeaderRole>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            className="inputField"
                            placeholder="Nachnamen eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            className="inputField"
                            type="password"
                            placeholder="Passwort eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField
                            className="inputField"
                            type="password"
                            placeholder="Passwort erneut eingeben...">
                        </InputField>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-registration-registrationpage"
                            value="Registrieren"
                            href="/teacher">
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default t_RegistrationPage;