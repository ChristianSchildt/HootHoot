import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Text from '../components/Text';
import Picture from '../components/Picture';
import Button from '../components/Button';
import Field from '../components/Field';
import withNavigate from '../utility/with-navigate';
import Swinner from '../components/swinner';
import LibraryTile from '../components/LibraryTile';

class t_WinnerAnimationPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            gameResults: [ // test data gets overridden if game sesson active
                {name: 'test player 1', points: 1000},
                {name: 'test player 2', points: 800},
                {name: 'test player 3', points: 600},
                {name: 'test player 4', points: 400},
                {name: 'test player 5', points: 200}
            ]
        }
        this.questionsAmount = 1;
        this.currentQuestionIndex = 0;   
        if (this.props.location.state) {
            this.question = this.props.location.state.question;
            this.questionsAmount = this.props.location.state.questionsAmount;
            this.currentQuestionIndex = this.props.location.state.currentQuestionIndex;
        } else {
            // test daten
            this.question = {
                time: 60,
                question: "Keine Frage ausgewählt",
                answers: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
                correctAnswerIndex: 3
            }
        }

        this.hasMoreQuestions = false;
    }
    
    componentDidMount() {
        if (!window.connection.socket) {
            // die Seite wurde nicht über vorherige Seite aufgerufen, deshalb gibt es kein Quiz zum starten
            console.warn("no socket connection")
            return;
        }
        window.connection.socket.emit('get-sorted-game-results', (gameResults) => {
            console.log(gameResults)
            this.setState({gameResults});
        })
        window.connection.socket.emit('has-another-question', (response) => {
            console.log(response)
            this.hasMoreQuestions = response;
        })
    }

    goToNextPage() {
        if (this.hasMoreQuestions) {
            this.props.navigate("/teacher/letStudentsJoin", {state: {continueGame: true}});
        } else {
            this.props.navigate("/teacher/homeMenu");
        }
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
                                // not properly implemented yet
                                //href="/teacher/answerEvaluation"
                                >
                            </Button>
                        </Col>

                        <Col md={2}>
                            <Button
                                className="button"
                                id="button-goOn-winnerAnimationPage"
                                value="Weiter"
                                onClick={this.goToNextPage.bind(this)}>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value={this.question.question}>
                                </Text>
                            </div>
                        </Col>
                    </Row>
                    <Row className='winner-row-animation'>
                        <Field idField="winneranimation">
                            <Swinner
                                valuefirst= {this.state.gameResults.length > 0 ? this.state.gameResults[0].name : ""}
                                valuesecond= {this.state.gameResults.length > 1 ? this.state.gameResults[1].name : ""}
                                valuethird={this.state.gameResults.length > 2 ? this.state.gameResults[2].name : ""}>
                            </Swinner>
                        </Field>
                        <Field idField="winnerattendess">  
                        <h2><u>Alle Teilnehmer</u></h2>
                            {this.state.gameResults.map((player) => (  
                                    <LibraryTile classNameLibrarytext="librarytext" valuetext={(player.name + "\nPoints:" + player.points)} /> 
                                ))}                         
                        </Field>
                    </Row>
                    <Row>
                        <Col  md={1}>
                            <Text
                                id="answerNumber-now-overall"
                                value={(this.currentQuestionIndex + 1) + "/" + this.questionsAmount}>
                            </Text>
                        </Col>
                        {/* <Col  md={{span: 2, offset:7}}>
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
                        </Col> */}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withNavigate(t_WinnerAnimationPage);