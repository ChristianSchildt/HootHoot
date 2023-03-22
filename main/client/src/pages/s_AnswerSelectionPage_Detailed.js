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
import withNavigate from '../utility/with-navigate';

class s_AnswerSelectionPage_Detailed  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            selectedAnswerIndex: null,
            question: null,
            startTime: null,
            timer: 0
        };

        if (this.props.navigation.state) {
            if (typeof(this.props.navigation.state.gameStarted) === "boolean") {
                this.state.gameStarted = this.props.navigation.state.gameStarted;
            }
            if (typeof(this.props.navigation.state.selectedAnswerIndex) === "boolean") {
                this.state.selectedAnswerIndex = this.props.navigation.state.selectedAnswerIndex;
            }
        }
    }

    componentDidMount() {
        if (window.connection.socket) {
            window.connection.socket.on('question-started', () => {
                this.setState({gameStarted: true, startTime: Date.now()})
            })

            window.connection.socket.emit('get-existing-game-info', (response) => {
                console.log(response);
                this.setState({question: response.question, startTime: response.startTime});


            });
        }
    }

    

    sendAnswer(answerIndex) {
        if (!this.state.gameStarted || this.state.selectedAnswerIndex != null) {
             return
        }
        this.setState({selectedAnswerIndex: answerIndex})

        if (window.connection.socket) {
            window.connection.socket.emit("answer", answerIndex)
        }
    }

    changeView() {
        this.props.navigate("/student/answerselectionMinimalist", {state: {
            gameStarted: this.state.gameStarted,
            selectedAnswerIndex: this.selectedAnswerIndex
        }});
    }


    render() {
        return(
            <div className="s_Answermin">
            <Container fluid>
            <Row>
                    <Col>
                        <Picture
                                id="logomenue"
                                src="/images/profil.png"
                                alt="Platzhalter Profilbild">
                        </Picture>
                        <Text
                            className="projectname-left"
                            value="HootHoot">
                        </Text>
                        <Button
                            className="button"
                            id="button_switchansicht_det"
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
                                    value={this.state.startTime ? this.state.startTime - Date.now()}>
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
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 0 ? '0.5': ''}}>
                        </Button>
                        <Button
                            className="button"
                            id="button-detail-answerbc"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 1 ? '0.5': ''}}
                            value="B: Antwort 2">
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            className="button"
                            id="button-detail-answerbc"
                            value="C: Antwort 3"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 2 ? '0.5': ''}}>
                        </Button>
                        <Button
                            className="button"
                            id="button-detail-answerad"
                            value="D: Antwort 4"
                            style={{"opacity": this.state.selectedAnswerIndex != null && this.state.selectedAnswerIndex !== 3 ? '0.5': ''}}>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }
}

export default withNavigate(s_AnswerSelectionPage_Detailed);