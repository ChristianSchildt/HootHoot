import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Picture from '../components/Picture';
import Text from '../components/Text';
import Button from '../components/Button';
import Field from '../components/Field';
import withNavigate from '../utility/with-navigate';

class t_PlayHootHootPage extends React.Component {

    constructor(props) {
        super(props);

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

        this.time = this.question.time;
        this.questionText = this.question.question;
        this.answerA = this.question.answers[0];
        this.answerB = this.question.answers[1];
        this.answerC = this.question.answers[2];
        this.answerD = this.question.answers[3];
        this.correctAnswerIndex = this.question.correctAnswerIndex;

        this.intervalId = undefined;

        this.state = {
            timer: this.question.time,
            answerCount: 0
        };
    }

    componentDidMount() {
        if (!window.connection.socket) {
            // die Seite wurde nicht über vorherige Seite aufgerufen, deshalb gibt es kein Quiz zum starten
            console.warn("no socket connection")
            return;
        }

        window.connection.socket.emit('question-started')
        window.connection.socket.on('answer-count-updated', (answerCount) => {
            this.setState({answerCount})
        })

        // check just to be sure
        if (!this.intervalId) {
            this.intervalId = setInterval(this.timerTick.bind(this), 1000)
        }
    }

    timerTick() {
        if (this.state.timer > 0) {
            this.setState({timer: this.state.timer - 1})
        } else {
            clearInterval(this.intervalId)
            this.endQuiz()
        }
    }

    endQuiz() {
        window.connection.socket.emit('stop-question')
        this.props.navigate("/teacher/answerEvaluation", {state: {
            question: this.question,
            questionsAmount: this.questionsAmount,
            currentQuestionIndex: this.currentQuestionIndex
        }});
    }

    render() {
        return(
            <div className='tPlayHootHootPage'>
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
                                id="button-skip-playHootHootPage"
                                value="Überspringen"
                                onClick={this.endQuiz.bind(this)}
                                // href=""
                                >
                            </Button>
                        </Col>
                    </Row>
                        <Col md={{span: 8, offset: 2}}>
                            <div id="div-HootHoot-question">
                                <Text
                                    id="HootHoot-question"
                                    value={this.questionText}>
                                </Text>
                            </div>
                        </Col>
                    <Row>
                        <Col>
                            {/* provisorischer Link für Countdown abgelaufen*/}
                            {/* <a href="/teacher/answerEvaluation"> */}
                            <div id="div-countdown">
                                <Text
                                    id="countdown"
                                    value={this.state.timer}>
                                </Text>
                            </div>
                            {/* </a> */}
                        </Col>
                        <Col>
                            <Field idField="div-media">
                                <Text
                                    id="media"
                                    value="HootHoot!">
                                </Text>
                            </Field>
                        </Col>
                        <Col>
                           <Text
                                id="counter-answers"
                                value={this.state.answerCount}>
                            </Text>
                            <Text
                                id="text-answers"
                                value="Antworten">
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerA">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="A">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerA}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerB">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="B">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerB}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span: 5, offset:1}}>
                            <div id="div-answerC">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="C">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerC}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            <div id="div-answerD">
                                <div className="column1-HootHoot-answers">
                                    <Text
                                        className="answer-letter"
                                        value="D">
                                    </Text>
                                </div>
                                <div className="column2-HootHoot-answers">
                                    <Text
                                        className="answer-text"
                                        value={this.answerD}>
                                    </Text>
                                </div>
                            </div>
                        </Col>
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

export default withNavigate(t_PlayHootHootPage);