import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../components/Button.js';
import HeaderRole from '../components/HeaderRole.js';

function t_LandingPage() {
    return (
        <div className="tLandingPage">
            <Container fluid>
                <Row>
                    <Col>
                        <HeaderRole
                            headervalue="HootHoot"
                            rolevalue="- Lehrkraft -">
                        </HeaderRole>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* TODO: Eule einbinden */}
                        <Button
                            className="button"
                            id="button-registration-tlandingpage"
                            href="/teacher/registration"
                            value="Registrieren">
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            className="button"
                            id="button-login-tlandingpage"
                            href="/teacher/login"
                            value="Anmelden">
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default t_LandingPage;