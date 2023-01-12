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

        // TODO: passing props between pages via navigate
        /*if (this.props.route) {
            this.time = this.props.route.params.time;
            this.question = this.props.route.params.question;
            this.answerA = this.props.route.params.answers[0];
            this.answerB = this.props.route.params.answers[1];
            this.answerC = this.props.route.params.answers[2];
            this.answerD = this.props.route.params.answers[3];
            this.correctAnswerIndex = this.props.route.params.correctAnswerIndex;
        }*/
        this.quiz = {
            time: 60,
            question: "Sind Sie mit dem GUI zufrieden?",
            answers: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
            correctAnswerIndex: 3
        }
        this.question = this.quiz.question;
        this.answerA = this.quiz.answers[0];
        this.answerB = this.quiz.answers[1];
        this.answerC = this.quiz.answers[2];
        this.answerD = this.quiz.answers[3];
        this.correctAnswerIndex = this.quiz.correctAnswerIndex;

        this.state = {
            timer: this.quiz.time
        };
    }

    componentDidMount() {
        if (!window.connection.socket) {
            // die Seite wurde nicht über vorherige Seite aufgerufen, deshalb gibt es kein Quiz zum starten
            return;
        }

        window.connection.socket.emit('quiz-started')
        
        // check just to be sure
        if (!this.timerStarted) {
            setInterval(this.timerTick.bind(this), 1000)
        }
    }
    
    timerTick() {
        this.timerStarted = true; //workaround
        if (this.state.timer > 0) {
            this.setState({timer: this.state.timer - 1})
        } else {
            // TODO: cldearnterval
            this.endQuiz()
        }
    }

    endQuiz() {
        this.props.navigate("/teacher/answerEvaluation", this.quiz)
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
                                    value={this.question}>
                                </Text>
                            </div>
                        </Col>
                    <Row>
                        <Col>
                            {/* provisorischer Link für Countdown abgelaufen*/}
                            <a href="/teacher/answerEvaluation">
                            <div id="div-countdown">
                                <Text
                                    id="countdown"
                                    value={this.state.timer}>
                                </Text>
                            </div>
                            </a>
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
                                value="5">
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

export default withNavigate(t_PlayHootHootPage);