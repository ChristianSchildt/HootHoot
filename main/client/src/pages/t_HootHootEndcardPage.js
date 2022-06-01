import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import Button from '../components/Button';
import Field from '../components/Field';

class t_HootHootEndcardPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            difficultQuestions : [
                {   
                    "id": 1,
                    "name": "Platzhalter Frage 1"
                },
                {   
                    "id": 2,
                    "name": "Platzhalter Frage 2"
                }
            ]
        };
    }
    
    render() {
        return(
            <div className='tHootHootEndcardPage'>
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
                        {/* <Col md={{span: 2, offset: 8}}>
                            <Button
                                className="button"
                                id="button-goOn-winnerAnimationPage"
                                value="Weiter"
                                // href=""
                                >
                            </Button>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col md={{span: 3, offset: 3}}>
                            <div id="div-repeat-HootHootEndcard">
                                <Text
                                    id="header-repeat-HootHootEndcard"
                                    value="Übung macht den Meister :)">
                                </Text>
                                <Button
                                    className="button"
                                    id="button-repeat-HootHootEndcard"
                                    value="Nochmal HootHooten"
                                    // href=""
                                    >
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <Button
                                className="button"
                                id="button-feedback-hoothootEndcard"
                                value="Feedback einholen"
                                // href=""
                                >
                            </Button>
                        </Col>
                        <Col>
                            <Row>
                                <Button
                                    className="button"
                                    id="button-exit-hoothootEndcard"
                                    value="Beenden"
                                    // href=""
                                    >
                                </Button>
                            </Row>
                            <Row>
                                <Button
                                    className="button"
                                    id="button-newGame-hoothootEndcard"
                                    value="Neues Spiel"
                                    // href=""
                                    >
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* TODO: Richtiger Imagebutton */}
                            <div id="backToWinneranimation">
                                <p>Platzhalter <br/> Button Siegeranimation</p>
                            </div>
                        </Col>
                        <Col>
                            <Field idField="difficult-questions"
                                classNameTitle="field-title"
                                valueTitle="Schwierige Fragen">
                                {this.state.difficultQuestions.map((dQuestion) => (  
                                <div className="div-difficult-question">
                                    <Text
                                        key={dQuestion.id.toString()} 
                                        className="difficult-question"
                                        value={dQuestion.name}>
                                    </Text>
                                </div>   
                                ))}
                                
                            </Field>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default t_HootHootEndcardPage;