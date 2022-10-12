import React from 'react';
import '../css/Pages.css';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../components/Button';
import Picture from '../components/Picture';
import Text from '../components/Text';
import HeaderQuestion from '../components/HeaderQuestion';
import ContentQuestion from '../components/ContentQuestion';

function s_AnswerSelectionPage_Detailed(){
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
                        value="Minimierte Ansicht"
                        href="/student/answerselectionMinimalist">
                    </Button>
                </Col>
            </Row>
            <Row>
                     <HeaderQuestion
                            question = "Sind sie mit den Mockup zufrieden?">
                    </HeaderQuestion>
            </Row>
            <Row>
                    <Col>
                        {/* provisorischer Link für Countdown abgelaufen*/}
                        <a href="/student/winnerAnimation">
                        <div id="div-countdown">
                            <Text
                                id="countdown"
                                value="20">
                                </Text>
                            </div>
                            </a>
                        </Col>
                    <ContentQuestion
                            contentquestion="HootHoot!"
                            id="logomenue"
                            src=""
                            alt="Platzhalter">  
                    </ContentQuestion>
                    <Col>
                           <Text
                                id="counter-answers"
                                value="5">
                            </Text>
                            <Text
                                id="text-answers"
                                value="Antworten">
                            </Text>
                        </Col>   
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-detail-answerad"
                        value="A: Antwort 1"
                        href="">
                    </Button>
                    <Button
                        className="button"
                        id="button-detail-answerbc"
                        value="B: Antwort 2"
                        href="">
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="button"
                        id="button-detail-answerbc"
                        value="C: Antwort 3"
                        href="">
                    </Button>
                    <Button
                        className="button"
                        id="button-detail-answerad"
                        value="D: Antwort 4"
                        href="">
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
    );
}

export default s_AnswerSelectionPage_Detailed;