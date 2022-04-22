import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderRole from '../components/HeaderRole';
import Button from '../components/Button';

function WelcomePage() {
    return (
        <div className="welcomePage">
            <Container fluid>
                <Row>
                    <Col>
                    {/* TODO: Eule einbinden */}
                        <HeaderRole
                            headervalue="Willkommen auf HootHoot"
                            rolevalue="- Informationen -">
                        </HeaderRole>
                    </Col>
                    {/* TODO: Wie verstehen wir unser E-Learning-Konzept */}
                </Row>
                <Row>
                    {/* TODO: Tiles näher aneinander */}
                    <Col>
                        <Button
                            className="tile"
                            value="Ich bin Lehrkraft"
                            href="/teacher">
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            className="tile"
                            value="Ich bin Lernender"
                            href="/student">
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WelcomePage;