import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import Button from '../components/Button.js';
import Field from '../components/Field';
import withNavigate from '../utility/with-navigate';

class t_LetStudentsJoinPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            players : [],
            pin: ""
        };

        this.continueGame = false;
        this.questions = [];

        if (this.props.location.state) {
            this.continueGame = this.props.location.state.continueGame && window.connection.socket != null;

            if (!this.continueGame) {
                this.questions = this.props.location.state.questions;
            }
        }

        // create test data if not questions provided
        if (!this.questions || this.questions.length === 0) {
            this.questions = [
                {
                    questionId: 123,
                    time: 60,
                    question: "Sind Sie mit dem GUI zufrieden?",
                    answers: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
                    answersIds: [-1, -1, -1, -1],
                    correctAnswerIndex: 3
                },
                {
                    questionId: 123,
                    time: 60,
                    question: "Wer ist der Beste?",
                    answers: ["Köhn", "Köhn", "Köhn", "Köhn"],
                    answersIds: [-1, -1, -1, -1],
                    correctAnswerIndex: 3
                }
            ]
        }

        this.questionsAmount = this.questions.length;
        this.currentQuestionIndex = 0;       
        this.question = this.questions[this.currentQuestionIndex];
    }
    
    componentDidMount() {
        if (!this.initializedConnection) { 
            window.connection.connect();
            console.log(this.continueGame)
            if (!this.continueGame) {
                window.connection.socket.emit('create-game', this.questions, (response) => {
                    console.log(response);
                    this.setState({pin: response.pin})
                });
            } else {
                window.connection.socket.emit('prepare-next-question', (response) => {
                    console.log(response);
                    if (response) {
                        this.question = response;
                    }
                })
                window.connection.socket.emit('get-existing-game-info', (response) => {
                    console.log(response);
                    this.setState({pin: response.pin, players: response.players});
                    this.questionsAmount = response.questionsAmount;
                    this.currentQuestionIndex = response.currentQuestionIndex;
                });
            }
    
            window.connection.socket.on('players-updated', (response) => {
                this.setState({players: response})
            })
            
            this.initializedConnection = true;
        }
    }

    startGame() {
        this.props.navigate("/teacher/playHootHoot", {state: {question: this.question, questionsAmount: this.questionsAmount, currentQuestionIndex: this.currentQuestionIndex}})
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
                                            value={this.state.pin}>
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
                                onClick={this.startGame.bind(this)}>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.players.map((player) => (  
                            <Col md={2}>
                                <div className="playernames">
                                    <Text
                                        className="playername"
                                        id=""
                                        value={player}>
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

export default withNavigate(t_LetStudentsJoinPage);