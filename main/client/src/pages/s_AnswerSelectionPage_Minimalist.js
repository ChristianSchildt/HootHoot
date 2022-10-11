import React from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../components/Button';
import Picture from '../components/Picture';
import Text from '../components/Text';



function s_AnswerSelectionPage_Minimalist(){
    return(
        <div className="s_Answermin">
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
                    <Col>
                         <Button
                            className="button"
                            id="button_switchansicht"
                            value="Detailierte Ansicht"
                            href="/student/answerselectionDetailed">
                         </Button>
                    </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-answerad"
                        value="A"
                        href="">
                    </Button>
                    <Button
                        className="button"
                        id="button-answerbc"
                        value="B"
                        href="">
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-answerbc"
                        value="C"
                        href="">
                    </Button>
                    <Button
                        className="button"
                        id="button-answerad"
                        value="D"
                        href="">
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default s_AnswerSelectionPage_Minimalist;