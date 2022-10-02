import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import Button from '../components/Button.js';
import Field from '../components/Field';

class t_LetStudentsJoinPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            players : [
                {   
                    "id": 1,
                    "name": "Mustafa"
                },
                {   
                    "id": 2,
                    "name": "Maurice"
                },
                {   
                    "id": 3,
                    "name": "Christian"
                },
                {   
                    "id": 4,
                    "name": "Roland"
                }
            ]
        };
    }

    render() {
        return(
            <div className ="tLetStudentsJoinPage">
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
                        <Col md={{span: 2, offset: 8}}>
                            <Button
                                className="button"
                                id="button-back-letStudentsjoinPage"
                                value="Zurück"
                                href="/teacher/homeMenu">
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Field idField="join-info">
                                <Col>
                                    <div className="column">
                                        <Text
                                            className=""
                                            id="joinUnder"
                                            value="Mitmachen unter">
                                        </Text>
                                    
                                        <Text
                                            className=""
                                            id="webAdress"
                                            value="[Hier wird die Web-Adresse stehen]">
                                        </Text>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="column">
                                        <Text
                                            className=""
                                            id="text-gamePIN"
                                            value="Spiel-PIN: ">
                                        </Text>
                                    
                                        <Text
                                            className=""
                                            id="number-gamePIN"
                                            value="123 4567">
                                        </Text>
                                    </div>   
                                </Col>
                            </Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text
                                className=""
                                id="text-lets"
                                value="Let's">
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                className="button"
                                id="button-HootHoot"
                                value="HootHoot!"
                                href="/teacher/playHootHoot">
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.players.map((player) => (  
                            <Col md={2}>
                                <div className="playernames">
                                    <Text
                                        key={player.id.toString()}
                                        className="playername"
                                        id=""
                                        value={player.name}>
                                    </Text>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default t_LetStudentsJoinPage;