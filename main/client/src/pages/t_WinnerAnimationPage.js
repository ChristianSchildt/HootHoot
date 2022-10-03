import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import Button from '../components/Button';
import Field from '../components/Field';

class t_WinnerAnimationPage extends React.Component {
    
    constructor(props) {
        super(props);

    }
    
    render() {
        return(
            <div className='tWinnerAnimationPage'>
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

                        <Col md={{span: 2, offset: 6}}>
                            <Button
                                className="button"
                                id="button-goBack-winnerAnimationPage"
                                value="Zurück"
                                href="/teacher/answerEvaluation">
                            </Button>
                        </Col>

                        <Col md={2}>
                            <Button
                                className="button"
                                id="button-goOn-winnerAnimationPage"
                                value="Weiter"
                                href="/teacher/hootHootEndcard">
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value="Mit dem GUI zufrieden?">
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Field idField="winneranimation">
                                {/* TODO: Siegeranimation einfügen */}
                                <h1>Platzhalter Siegeranimation</h1>
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col  md={1}>
                            <Text
                                id="answerNumber-now-overall"
                                value="1/1">
                            </Text>
                        </Col>
                        <Col  md={{span: 2, offset:7}}>
                            <Text
                                id="gamePIN-text"
                                value="Spiel-PIN:">
                            </Text>
                        </Col>
                        <Col>
                            <Text
                                id="gamePIN-number"
                                value="123 4567">
                            </Text>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default t_WinnerAnimationPage;